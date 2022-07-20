const express = require("express");
const app = require("../app");
const request = require("supertest");
const userRouter = require("../router/userRouter");
const fs = require("fs");
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmQ3OWJmOGVhZjkzYmFiNTNmYjAxNTYiLCJpYXQiOjE2NTgyOTc4NzF9.sicIsQXQLr90cJae-mfeE_KzFTEjrqjkk2Szr-j1jJI";

// User Router testting

// describe("POST /user/register", function () {
//   it("User register test", function (done) {
//     request(app)
//       .post("/user/register")
//       .send({
//         username: "user122",
//         password: "user122",
//         email: "user122@gmai.com",
//         userType: "user",
//         phone: "324234234",
//       })
//       .expect("Content-Type", /json/)
//       .expect(201, done);
//   });
// });

describe("POST /user/login", function () {
  it("User login test", function (done) {
    request(app)
      .post("/user/login")
      .send({ username: "user12", password: "user12" })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});
describe("GET /user/dashboard", function () {
  it("User profile test", function (done) {
    request(app)
      .get("/user/dashboard")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

describe("PUT /user/update_profile", function () {
  it("profile update test", function (done) {
    request(app)
      .put("/user/update_profile")
      .set("Authorization", token)
      .send({
        firstname: "Harry",
        lastname: "Kane",
        address: "UK",
        gender: "Male",
      })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});
// describe("PUT /user/update_profile_img", function () {
//   it("profile image update test", function (done) {
//     request(app)
//       .put("/user/update_profile_img")
//       .field("Content-Type", "multipart/form-data")
//       .set("Authorization", token)
//       .attach(
//         "user_img",
//         fs.readFileSync(
//           "D:ProjectsAssignmentsWebN-Rental_web\testing\16562152702412018_Tesla_Model_S_75D.jpg"
//         )
//       )
//       .expect("Content-Type", /json/)
//       .expect(201, done);
//   });
// });

// vehicle router testing

describe("GET /vehicle/get", function () {
  it("Get all Vehicles test", function (done) {
    request(app)
      .get("/vehicle/get")
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});
describe("GET /vehicle/filter/:category", function () {
  it("Get Vehicles of a category test", function (done) {
    request(app)
      .get("/vehicle/filter/Car")
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

describe("GET /vehicle/get/featured", function () {
  it("Get featured vehicles test", function (done) {
    request(app)
      .get("/vehicle/get/featured")
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

describe("GET /vehicle/:id", function () {
  it("Get specific vehicle test", function (done) {
    request(app)
      .get("/vehicle/62ad9910192d892c72b799ea")
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});
describe("PUT /vehicle/update", function () {
  it("Update vehicle details test", function (done) {
    request(app)
      .put("/vehicle/update")
      .set("Authorization", token)
      .send({
        _id: "62ad9910192d892c72b799ea",
        vehicle_name: "Yamaha MT-7",
        vehicle_desc:
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        vehicle_rich_desc:
          "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        is_featured: true,
        vehicle_company: "Yamaha",
        vehicle_sku: "JADS122",
        booking_cost: "2000",
        vehicle_category: "Bike",
      })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

// describe("DELETE /vehicle/delete/:id", function () {
//   it("Delete a vehicle test", function (done) {
//     request(app)
//       .delete("/vehicle/62ad9910192d892c72b799ea")
//       .expect("Content-Type", /json/)
//       .expect(201, done);
//   });
// });

// category router test

// describe("POST /category/insert", function () {
//   it("Insert category test", function (done) {
//     request(app)
//       .post("/category/insert")
//       .set("Authorization", token)
//       .send({
//         category_name: "Cycle",
//         category_desc: "Two wheeled pedal cycles",
//       })
//       .expect("Content-Type", /json/)
//       .expect(201, done);
//   });
// });

describe("GET /category/get", function () {
  it("Get all categories test", function (done) {
    request(app)
      .get("/category/get")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

describe("PUT /category/update", function () {
  it("Update category test", function (done) {
    request(app)
      .put("/category/update")
      .set("Authorization", token)
      .send({
        _id: "62bd5468b935e350e732eb5c",
        category_name: "Bike",
        category_desc: "Two wheeled motor running bicycle",
      })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

// article Router test

describe("GET /article/get", function () {
  it("Get articles test", function (done) {
    request(app)
      .get("/article/get")
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});
describe("GET /article/get/featured", function () {
  it("Get featured articles test", function (done) {
    request(app)
      .get("/article/get/featured")
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

describe("PUT /article/update", function () {
  it("Update article test", function (done) {
    request(app)
      .put("/category/update")
      .set("Authorization", token)
      .send({
        _id: "62b814918ffae5a87ee38d25",
        title: "Tesla new model in market",
        date: "2020-12-22",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero, amet, tortor sit eros, habitasse lectus tincidunt est vulputate.Vel risus euismod viverra in ac. Leo quisque vitae duis ante dignissim et aliquam. <br/> <br/> Elementum bibendum blandit etiam purus. Praesent viverra ac sagittis elit nulla egestas dui nunc. Auctor elementum nisl in semper quis nulla. Diam sit lectus sagittis pellentesque.",
        rich_description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero, amet, tortor sit eros, habitasse lectus tincidunt est vulputate.Vel risus euismod viverra in ac. Leo quisque vitae duis ante dignissim et aliquam. <br/> <br/> Elementum bibendum blandit etiam purus. Praesent viverra ac sagittis elit nulla egestas dui nunc. Auctor elementum nisl in semper quis nulla. Diam sit lectus sagittis pellentesque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero, amet, tortor sit eros, habitasse lectus tincidunt est vulputate.Vel risus euismod viverra in ac. Leo quisque vitae duis ante dignissim et aliquam. <br/> <br/> Elementum bibendum blandit etiam purus. Praesent viverra ac sagittis elit nulla egestas dui nunc. Auctor elementum nisl in semper quis nulla. Diam sit lectus sagittis pellentesque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero, amet, tortor sit eros, habitasse lectus tincidunt est vulputate.Vel risus euismod viverra in ac. Leo quisque vitae duis ante dignissim et aliquam. <br/> <br/> Elementum bibendum blandit etiam purus. Praesent viverra ac sagittis elit nulla egestas dui nunc. Auctor elementum nisl in semper quis nulla. Diam sit lectus sagittis pellentesque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero, amet, tortor sit eros, habitasse lectus tincidunt est vulputate.Vel risus euismod viverra in ac. Leo quisque vitae duis ante dignissim et aliquam. <br/> <br/> Elementum bibendum blandit etiam purus. Praesent viverra ac sagittis elit nulla egestas dui nunc. Auctor elementum nisl in semper quis nulla. Diam sit lectus sagittis pellentesque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero, amet, tortor sit eros, habitasse lectus tincidunt est vulputate.Vel risus euismod viverra in ac. Leo quisque vitae duis ante dignissim et aliquam. <br/> <br/> Elementum bibendum blandit etiam purus. Praesent viverra ac sagittis elit nulla egestas dui nunc. Auctor elementum nisl in semper quis nulla. Diam sit lectus sagittis pellentesque.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Libero, amet, tortor sit eros, habitasse lectus tincidunt est vulputate.Vel risus euismod viverra in ac. Leo quisque vitae duis ante dignissim et aliquam. <br/> <br/> Elementum bibendum blandit etiam purus. Praesent viverra ac sagittis elit nulla egestas dui nunc. Auctor elementum nisl in semper quis nulla. Diam sit lectus sagittis pellentesque.",
        is_featured: true,
      })
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

// describe("DELETE /article/delete/:id", function () {
//   it("Delete articles test", function (done) {
//     request(app)
//       .delete("/article/delete/62b814918ffae5a87ee38d25")
//       .expect("Content-Type", /json/)
//       .expect(201, done);
//   });
// });
