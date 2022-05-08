"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetUsersLazyQuery = exports.useGetUsersQuery = exports.GetUsersDocument = exports.UserSort = void 0;
const client_1 = require("@apollo/client");
const Apollo = __importStar(require("@apollo/client"));
const defaultOptions = {};
var UserSort;
(function (UserSort) {
    UserSort["Asc"] = "asc";
    UserSort["Desc"] = "desc";
})(UserSort = exports.UserSort || (exports.UserSort = {}));
exports.GetUsersDocument = (0, client_1.gql) `
  query GetUsers(
    $nameFilter: String
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    Users(
      nameFilter: $nameFilter
      first: $first
      after: $after
      last: $last
      before: $before
    ) {
      edges {
        cursor
        node {
          id
          name
          username
          email
          createdAt
          updatedAt
          friends {
            id
            name
            username
            email
            createdAt
            updatedAt
          }
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasPreviousPage
        hasNextPage
      }
    }
  }
`;
function useGetUsersQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.GetUsersDocument, options);
}
exports.useGetUsersQuery = useGetUsersQuery;
function useGetUsersLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.GetUsersDocument, options);
}
exports.useGetUsersLazyQuery = useGetUsersLazyQuery;
//# sourceMappingURL=graphql.js.map