import { useState, useEffect } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

/*
Class componentleriyle functional componentlerin arasındaki en büyük fark bileşenin içindeki "this.props" yapmak yerine gerçek argümanın kendisini yapmaktır.
Arama yaptığımızda önce renderin çağrıldığını ve ardından dize değerinin çağrıldığını fark edeceğiz.
Bunun anlamı, React'in bu fonksiyonun tamamını her seferinde çalıştırıyor olmasıdır. İşlevsel bir bileşen olan bir bileşeni
yeniden oluşturması gerekir. Tüm bu işlevsel bileşeni, render yöntemiyle aynı şey olarak görebiliriz.
Olayımız her değiştiğinde durum değeri güncelleniyor çünkü ya dizeye yeni karakterler yazıyoruz ya da dizeden karakterleri kaldırıyoruz.
*/

/* Fonksiyonel bileşen oluşturduğu veya işlediği her zaman bu işlevin içindeki kodu çalıştırır yukarıdan aşağıya doğru her seferinde */
const App = () => {
  const [searchField, setSearchField] = useState("");
  const [title, setTitle] = useState("");         /* useState bize 2 değerden oluşan bir dizi verir. Dizi yapılandırması: değişkenleri bir dizinin içindeki değerlere atamamıza izin vermektedir.*/
  const [monsters, setMonsters] = useState([]);

  /* bu call back fonksiyonu, işlevsel bileşenimizin içinde
  gerçeklesmesini istediğimiz kod veya efekt olacak. 
  Dizi ise durum değerleri olacaktır, yani searchField veya monster ya da işlevsel bileşenimize
  prop olarak aktarılan argümanlar olacak. Dizinin içindeki değerlerden herhangi biri değiştiğinde
  callback işlevini çalıştıracağımdır. Burada işlevsel fonksiyonumun ilk kez bağlanmasının dışında bir daha tetiklemeyeceğiz, bunun için boş bir diziye eşitledik   */

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  /*  Fetch, bazı yabancı API'lerden getirme yapıyor, ayrıca bu sonsuz döngüye girer.  
  herhangi bir fetch çağrısı bir yan etkidir, bu özel durumumuzda, bu kullanıcının dizisidir. 
  Bu dizi tarayıcımızın dışından geldiği için, bize bellekte sakladığımızdan 
farklı bir dizi verecektir, dizinin içindeki değerler tamamen aynı olsa bile api urlsini 
her çağırdığımızda 10 kullanıcı nesnesini bu dize geri alacağımızı biliyoruz. Bu dizinin bellekte aynı referansa işaret edip etmediğiyle ilgilir. */

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);       /* burada searchField basarsak yazdığımız değerleri göremeyeceğiz çünkü eğer bu durum değeri aynı değer ise, o zaman bu fonksiiyonu tekrar çalıştırmayın. */
  };
  /* Burada arama değişikliği işleyecimizin davranışını başlık değişikliği işleyicisiyle kopyalıyoruz  */
  const onTitleChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setTitle(
      searchFieldString);       /* burada searchField basarsak yazdığımız değerleri göremeyeceğiz çünkü eğer bu durum değeri aynı değer ise, o zaman bu fonksiiyonu tekrar çalıştırmayın. */
  };

  /* bu fonksiyonel bileşenimiz her çalıştığında filterelenmiş canavarlar değişmemiş olsa bile, filterenmiş canavarlar dizisinin yeniden oluşturulduğudur.  */
  const filteredMonsters = monsters.filter((monster) => {
    return monster.name.toLocaleLowerCase().includes(searchField);
  });

  return (
    <div className="App">
      <h1 className="app-title">{title}</h1>
      {/* Canavarları aramak için bir arama kutusu. Ayrıca burayı başka bir dosyada props kullanarak değer verdik */}
      <SearchBox
        className="monsters-search-box"
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
      />
    
      <SearchBox
        className="title-search-box"
        onChangeHandler={onTitleChange}
        placeholder="set title"
      />
      <CardList monsters={filteredMonsters} /> {/* props  */}
    </div>
  );
};
export default App;