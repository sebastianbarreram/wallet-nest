<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

# API Reference

## Get all customers

This endpoint is used to get a list with all customers.

### Request

```http
  GET /customer
```

| **Method Details**       |          |
| :----------------------- | :------- |
| HTTP Method              | **GET**  |
| Response Format          | **json** |
| Requires Authentication? | **No**   |

### Response

```
[
    {
        "uuid": "1",
        "nombre": "Sebastian",
        "apellidos": "Barrera Marín",
        "telefono": 1111111,
        "documento": "123456789"
    },
    {
        "uuid": "2",
        "nombre": "Santiago",
        "apellidos": "Barrera Marín",
        "telefono": 2222222,
        "documento": "789456123"
    },
    {
        "uuid": "3",
        "nombre": "Humberto",
        "telefono": 3333333,
        "documento": "456789123",
        "apellidos": null
    }
]
```

**Status:** 200 OK

## Get a customer

This endpoint is used to fetch a specific customer by its uuid.

### Request

```http
  GET /customer/${uuid}
```

| **Method Details**       |          |
| :----------------------- | :------- |
| HTTP Method              | **GET**  |
| Response Format          | **json** |
| Requires Authentication? | **No**   |

| **Parameter** | **Type** | **Description**                         |
| :------------ | :------- | :-------------------------------------- |
| `uuid`        | `string` | **Required**. Uuid of customer to fetch |

### Response `/customer/2`

```
{
    "uuid": "2",
    "nombre": "Santiago",
    "apellidos": "Barrera Marín",
    "telefono": 2222222,
    "documento": "789456123"
}
```

**Status:** 200 OK

## Create a new client

This endpoint is used to store a client.

### Request

```http
  POST /api/client
```

| **Method Details**       |          |
| :----------------------- | :------- |
| HTTP Method              | **POST** |
| Response Format          | **json** |
| Requires Authentication? |  **No**  |

| **Parameter**       | **Type**       | **Description**                                                                                                       |
| :------------------ | :------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `Auth Access Token` | `Bearer Token` | **Required**. Used to authenticate the request                                                                        |
| `uuid`              | `string`       | **Optional**. The uuid of the customer. This unique identifier is auto-generated if it does not exist in request body |
| `nombre`            | `string`       | **Required**. The name of the customer                                                                                |
| `apellidos`         | `string`       | **Optional**. The surnames of the customer. The default value is null if it does not exist in request body            |
| `telefono`          | `number`       | **Required**. The phone number of the customer                                                                        |
| `documento`         | `string`       | **Required**. The Identity document of the customer                                                                   |

### Request example

BODY `raw`:

```
{
    "nombre": "Diana",
    "telefono": 4444444,
    "documento": "123798456"
}
```

AUTHORIZATION `Bearer Token`:

```
99e4c497d8b4c049ce41e71ff04055adc01714bccdf2f901e4c1d16ffabcef571398fa2b416ddc1037a98c4040c2f277c1bbb2dbc647ed65a2acaf657ac229ec
```

### Response

```
{
    "uuid": "14e07020-d851-4d56-8d77-511b1412b718",
    "nombre": "Diana",
    "telefono": 4444444,
    "documento": "123798456",
    "apellidos": null
}
```

**Status:** 201 Created

## Update a customer

This endpoint is used to update a previously created custumer.

### Request

```http
  PUT /customer/${uuid}
```

| **Method Details**       |          |
| :----------------------- | :------- |
| HTTP Method              | **PUT**  |
| Response Format          | **json** |
| Requires Authentication? | **Yes**  |

| **Parameter**       | **Type**       | **Description**                                                                                            |
| :------------------ | :------------- | :--------------------------------------------------------------------------------------------------------- |
| `Auth Access Token` | `Bearer Token` | **Required**. Used to authenticate the request                                                             |
| `uuid`              | `string`       | **Required**. The uuid of the customer you want to update                                                  |
| `nombre`            | `string`       | **Required**. The name of the customer                                                                     |
| `apellidos`         | `string`       | **Optional**. The surnames of the customer. The default value is null if it does not exist in request body |
| `telefono`          | `number`       | **Required**. The phone number of the customer                                                             |
| `documento`         | `string`       | **Required**. The Identity document of the customer                                                        |

### Request example `/customer/2`

URL: localhost:3000/customer/2

BODY `raw`:

```
{
    "nombre": "Diana",
    "apellidos": "Marín",
    "telefono": 111111111111111111111,
    "documento": "123798456"
}
```

AUTHORIZATION `Bearer Token`:

```
99e4c497d8b4c049ce41e71ff04055adc01714bccdf2f901e4c1d16ffabcef571398fa2b416ddc1037a98c4040c2f277c1bbb2dbc647ed65a2acaf657ac229ec
```

### Response

```
{
    "uuid": "2",
    "nombre": "Diana",
    "apellidos": "Marín",
    "telefono": 111111111111111110000,
    "documento": "123798456"
}
```

**Status:** 200 OK

## Update a costumer partially

This endpoint is used to update a previously created custumer partially.

### Request

```http
  PATCH /customer/${uuid}
```

| **Method Details**       |           |
| :----------------------- | :-------- |
| HTTP Method              | **PATCH** |
| Response Format          | **json**  |
| Requires Authentication? | **Yes**   |

| **Parameter**       | **Type**       | **Description**                                                                                            |
| :------------------ | :------------- | :--------------------------------------------------------------------------------------------------------- |
| `Auth Access Token` | `Bearer Token` | **Required**. Used to authenticate the request                                                             |
| `uuid`              | `string`       | **Required**. The uuid of the customer you want to update                                                  |
| `nombre`            | `string`       | **Optional**. The name of the customer                                                                     |
| `apellidos`         | `string`       | **Optional**. The surnames of the customer. The default value is null if it does not exist in request body |
| `telefono`          | `number`       | **Optional**. The phone number of the customer                                                             |
| `documento`         | `string`       | **Optional**. The identity document of the customer                                                        |

### Request example `/customer/2`

BODY `raw`:

```
{
    "documento": "0000000000000000000000000"
}
```

AUTHORIZATION `Bearer Token`:

```
99e4c497d8b4c049ce41e71ff04055adc01714bccdf2f901e4c1d16ffabcef571398fa2b416ddc1037a98c4040c2f277c1bbb2dbc647ed65a2acaf657ac229ec
```

### Response

```
{
    "uuid": "2",
    "nombre": "Santiago",
    "apellidos": "Barrera Marín",
    "telefono": 2222222,
    "documento": "0000000000000000000000000"
}
```

**Status:** 200 OK

## Delete a costumer

This endpoint is used to delete a existing custumer.

### Request

```http
  DELETE /customer/${uuid}
```

| **Method Details**       |             |
| :----------------------- | :---------- |
| HTTP Method              | **DELETE**  |
| Response Format          | **boolean** |
| Requires Authentication? | **Yes**     |

| **Parameter**       | **Type**       | **Description**                                           |
| :------------------ | :------------- | :-------------------------------------------------------- |
| `Auth Access Token` | `Bearer Token` | **Required**. Used to authenticate the request            |
| `uuid`              | `string`       | **Required**. The uuid of the customer you want to delete |

### Request example `/customer/2`

AUTHORIZATION `Bearer Token`:

```
99e4c497d8b4c049ce41e71ff04055adc01714bccdf2f901e4c1d16ffabcef571398fa2b416ddc1037a98c4040c2f277c1bbb2dbc647ed65a2acaf657ac229ec
```

### Response

```
true
```

**Status:** 200 OK

