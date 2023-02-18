//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
chai.use(chaiHttp);
describe("Users", () => {
  describe("/GET users", () => {
    it("it should GET all the pets", (done) => {
      chai
        .request(server)
        .get("/user/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(3); // fixme :)
          done();
        });
    });
  });
});
