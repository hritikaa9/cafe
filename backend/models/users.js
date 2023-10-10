class User {
    constructor(id, name, contactNumber, email, password, status, role) {
      this.id = id;
      this.name = name;
      this.contactNumber = contactNumber;
      this.email =email;
      this.password = password;
      this.status = status;
      this.role = role;
    }
  }
  
  class Category{
    constructor(id, name){
      this.id = id;
      this.name = name;
    }

    
  }

  class Product{
    constructor(id, name, categoryId, description, price, status){
      this.id = id;
      this.name = name;
      this.categoryId = categoryId;
      this.description = description;
      this.price = price;
      this.status = status;

    }
  }
  class Bill {
    constructor(id, uuid, name, email, contactNumber, paymentMethod, total, productDetails, createdBy) {
      this.id = id;
      this.uuid = uuid;
      this.name = name;
      this.contactNumber = contactNumber;
      this.paymentMethod=paymentMethod ;
      this.total  = total;
      this.productDetails   = JSON.parse (JSON.stringify(productDetails));
      this.createdBy    = createdBy;
    }
  }

  // module.exports = User;
  // module.exports = Category;
  module.exports = Bill;