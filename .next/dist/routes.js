'use strict';

var routes = require('next-routes')();

routes.add('/campaings/new', '/campaigns/new').add('/campaings/:address', '/campaigns/show').add('/campaigns/:address/requests', '/campaigns/requests/index').add('/campaigns/:address/requests/new', '/campaigns/requests/new');

module.exports = routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy5qcyJdLCJuYW1lcyI6WyJyb3V0ZXMiLCJyZXF1aXJlIiwiYWRkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLFNBQVUsQUFBaEI7O0FBR0MsT0FDQyxBQURELElBQ0ssQUFETCxrQkFDdUIsQUFEdkIsa0JBRUMsQUFGRCxJQUVLLEFBRkwsdUJBRTRCLEFBRjVCLG1CQUdDLEFBSEQsSUFHSyxBQUhMLGdDQUdxQyxBQUhyQyw2QkFJQyxBQUpELElBSUssQUFKTCxvQ0FJeUMsQUFKekM7O0FBTUEsT0FBTyxBQUFQLFVBQWdCLEFBQWhCIiwiZmlsZSI6InJvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9rYWZjaW9vL2tpY2tzdGFydCJ9