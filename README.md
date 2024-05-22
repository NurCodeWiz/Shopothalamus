# Shopothalamus

## Live Site

- https://shopothalamus.onrender.com


Shopothalamus, a full-stack application inspired by Amazon, is an e-commerce platform where users can buy and sell a wide range of unique products and items.

## Database Schema Design


<div style="max-width: 600px; margin: auto;">
    <img src="./react-vite/images/db-schema.png" alt="Database Schema" style="width: 100%;"/>
</div>

## Get Started

## Author
 * Nur Unlu
   * https://github.com/NurCodeWiz

**Prerequisites**
- NPM
- A version of Node.js >= 14 on your local machine
- Python 3.9
- PostgreSQL
- An AWS S3 bucket

**Installation**
- Clone the repo
- Install dependencies ``` pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt```
- `cd react-app` and run `npm install`
- Create a **.env** file based on the example with proper settings for your development environment
- Setup a PostgreSQL database, user, and password and make sure they match your **.env** file.
- Get into your pipenv, migrate your database, seed your database, and run your app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run

- Create your AWS user and bucket:
    - Create a bucket: (https://s3.console.aws.amazon.com/s3/home?region=us-east-1)
    - Navigate to ( https://console.aws.amazon.com/iam/home?#/users) to create a user with `Programmatic access`.
    - Set up a security policy for your user: 'Attach existing policies directly' => 'Create Policy'
    - Click the `JSON` tab and set a policy.
- Now update your **.env** with your `S3_BUCKET`, `S3_KEY`, `S3_SECRET`
- Fire up your servers: `flask run` in root and `npm start` in `react-app`

## Technologies
- JavaScript
- React
- Redux
- PostgreSQL
- Python
- AWS SDK

## Features

1. **Landing Page**

<img width="700" src="https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-05-21+at+11.22.46+PM.png">

--------------------------------------------------------------------------------------------------------
2. **Categories Page**

<img width="700" src="https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-05-21+at+7.52.27+PM.png">

--------------------------------------------------------------------------------------------------------
3. **Search**

   - Users can search for products name using the Search feature.

<img width="700" src="https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-05-21+at+11.31.45+PM.png">

--------------------------------------------------------------------------------------------------------


4. **All Products Page**

<img width="700" src="https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-05-21+at+11.25.14+PM.png">

--------------------------------------------------------------------------------------------------------

5. **Authentication**
   - New account creation, log in, and log out functionalities.
   - Guest/demo login option for trying out the site.
   - Users must be logged in to access orders, wish lists, or create reviews.

--------------------------------------------------------------------------------------------------------

6. **Reviews**
   - CRUD operations for product reviews.
   - Users can create new reviews on items.
   - Users can add an image to their review.
   - All users can read existing reviews on items.
   - Review creators can update and delete their own reviews.

   <img width="700" src="https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-05-21+at+6.28.27+PM.png">

   - Update review page

   <img width="700" src="https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-05-21+at+6.28.41+PM.png">

--------------------------------------------------------------------------------------------------------

7. **Cart**
   - CRUD operations for the shopping cart.
   - Users can create a cart.
   - Users can view the items in their shopping cart.
   - Users can add, update quantities, and remove products from their carts.
   - Total price will be displayed on the shopping cart page.
   - Items that are in the cart will be cleared from the cart after payment is complete.



<img width="700" src="https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-05-21+at+6.30.31+PM.png">

8. **Checkout Page**
   - Users can checkout their carts and will be directed to the checkout page.

<img width="700" src="https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-05-21+at+6.30.57+PM.png">

--------------------------------------------------------------------------------------------------------
9. **Orders**
   - CRD operations for orders.
   - Users can see open and past orders.
   - Users can submit their current cart as an order.
   - Users can cancel open orders.

<img width="700" src="https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-05-21+at+7.20.34+PM.png">

<img width="700" src="https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-05-21+at+7.23.57+PM.png">

--------------------------------------------------------------------------------------------------------

10. **Products**
   - CRUD operations for product listings.
   - Users can create new product listings.
   - Users can view existing listings.
   - Creators can add and delete product images for their own listings.
   - Creators can update or delete their own product listings.


<img width="700" src="https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-05-21+at+7.34.43+PM.png">

<img width="700" src="https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-05-21+at+6.33.14+PM.png">

<img width="700" src="https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-05-21+at+6.33.23+PM.png">

<img width="700" src="https://nurawsbucket.s3.amazonaws.com/Screen+Shot+2024-05-21+at+7.37.10+PM.png">
