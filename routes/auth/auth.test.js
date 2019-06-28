const supertest = require('supertest');

const server = require('../../api/server');




describe('credentials', () => {

    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
      });

      
    it("should be able to login", () => {
        return supertest(server).post("/api/login")
          .send({
            email: "Jamar.Russel76@gmail.com",
            password: "pass"
          })
          .expect(200)
      });
})



