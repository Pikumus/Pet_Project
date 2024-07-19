class Product {
  constructor(id, img, title, text, price) {
    this.id = id;
    this.img = img;
    this.title = title;
    this.text = text;
    this.price = price;
  }
}

export default {
  state: {
    Products: [
      new Product(
        0,
        require("@/assets/image/1.png"),
        "Устрицы по рокфеллеровски",
        "Значимость этих проблем настолько очевидна, что укрепление и развитие структуры ",
        "2700"
      ),
      new Product(
        1,
        require("@/assets/image/2.png"),
        "Свиные ребрышки на гриле с зеленью",
        "Не следует, однако забывать, что реализация намеченных плановых",
        "1600"
      ),
    ],
  },
  getters: {
    getProducts: (state) => state.Products,
  },
};
