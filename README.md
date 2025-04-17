<h1 align="center"> Apartment Listing App </h1>

A full stack application that facilitates adding, listing and reading details about a particular apartment

---
## How to try

Clone the repository, `cd  cd ApartmentApp`, and finally `docker compose up`. The frontend server exposes port `3000:3000` and the backend server exposes `9090:9090`

---
## Backend
Typescript and Fastify are used to build RESTful APIs to perform create and read operations, PostgreSQL is the database of Choice.

### ERD
![[apartment-erd.drawio.png]]
### APIs
All APIs are prefix with `/api/v1/apartment`
##### Status Code
###### `500`
Internal server error

#### `POST /add`
##### Description
Adds an apartment All the details must be present to add the apartment successfully. If the apartment to be added has identical address and unit number to an existing apartment. The existing one gets erased and the new one is added.
##### Request Body
Must be JSON and have the following fields
| Property Name | Type | 
| - | - |
| name | `string` (Required) | 
| size | `integer > 0` (Required) | 
| beds | `integer >= 0` (Required) | 
| baths | `integer >= 0` (Required) | 
| price | `integer >= 0` (Required) | 
| finishing | `string` (Required) | 
| delivery | `string` satisfying `date` format `YYYY-MM-DD` (Required) | 
| about | `string` (Required) |
| amenities | `string[]` (Required) |
| pictures | `string[]` (Required) |
| address | `Address` (Required) |

Properties of `Address`
| Property Name | Type | 
| - | - |
| blockNumber | `integer` (Required) | 
| city | `string` (Required) | 
| province | `string` (Required) | 
| location | if exist must have `lat` and `long` both of type `number` | 

##### Status Cods & Errors
###### `201` 
- Apartment is successfully added and apartment `id` is returned as response text
###### `400`
Happens when body is invalid - `string` reponse is violation 

#### `GET /:id`
##### Description
Gets a particular apartment with all of its details including pictures and amenities list
##### Params
###### id
The integer identifier of the apartment
##### Status Codes & Errors
###### `200`
Body is of type `Apartment` [check out `packages/types`](./packages/types/index.ts)
###### `404`
Happens When apartment doesn't exist - empty response

#### `GET /list`
Gets a list of apartments with their pictures
##### Query String
###### `term` (`string`)
A term to search for in unit number column, apartment name and project name
###### `limit` (`number`)
Limits the result set which can be useful in pagination
###### `offset` (`number`)
Specifies the offset where the result set start which complement `limit` in pagination solution
###### `sortBy` (`string`)
Specifies a column to sort by
###### `sortOrder` (`"asc" | "desc"`)
Specifies sort direction
#### Status Codes & Errors
##### `200`
Response of type `Apartment[]` [check out `packages/types`](./packages/types/index.ts)
##### `400`
Happens as a result of wrong query string parameter type - `string` response is the violation