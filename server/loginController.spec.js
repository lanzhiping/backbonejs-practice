"use strict";

var loginController = require("./loginController");

fdescribe("loginController", function() {
    var request = jasmine.createSpyObj("request", ["query"]),
        response = jasmine.createSpyObj("response", ["redirect"]),
        next = jasmine.createSpy("next");

    describe("login", function() {
        beforeEach(function() {
            spyOn(loginController, "isLogined").and.returnValue(false);
            spyOn(loginController, "_getToken").and.callThrough();
        });

        it("should redirect to sign url if not logined", function() {
            loginController.login(request, response, next);

            expect(response.redirect)
                .toHaveBeenCalledWith(loginController._getOauthAddress());
        });

        it("should call getToken if code query is not null", function() {
            request.query = { code: "12345678" };
            loginController.login(request, response, next);
            expect(loginController._getToken).toHaveBeenCalledWith(request.query.code);
        })
    });
});