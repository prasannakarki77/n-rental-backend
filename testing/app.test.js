const express = require("express");
const app = require("../app");
const request = require("supertest");
const userRouter = require("../router/userRouter");
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
//       .set("Authorization", token)
//       .attach("user_img", "../images/1655452089782circuit-diagram_bb.png")
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