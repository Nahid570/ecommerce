# Ecommerce
## [LIVE LINK](https://zippy-conkies-b43f94.netlify.app/) 

This is an E-commerce product listing page using ReactJS and all the products comes from  [Fake Store API](https://fakestoreapi.com/).

## Setup
[Clone This](https://github.com/Nahid570/ecommerce.git)
After cloning open the project into vs-code or whatever IDE you love. Go to project directory, then-<br>
yarn <br>
yarn dev <br>
and that's it. Project will be running locally. <br>
## My Approach
While building this project for State Management I'm using React <b>Context API</b>. I'm managing this project state using single context which is <b>ProductContext</b>. I can make another context for managing authenticated users like AuthContext but the issue with that 
is When some changes in AuthContext occures it will render ProductContext also that's why I'm using single context to avoid this re-rendering.
To store all products I'm using Local Storage as database. User can Register a new account and login to there account. For login it requires
Username and Password. <b> Note that Faraji123 and faraji123 </b> will treat as a same username. <br>
Rather than any fancy design I keep my design simple and make sure that all the functionalities work properly mentioned in the 
Assignment docs. The first created account will be the <b>Admin Account</b>. Admin can add/update/delete product. <br>
I didn't crate any protected routes as it is not mentioned in the docs. User can add item to the cart without login to this site.
When a user create an account and login and added a item to the cart it will store in a separe cart. I mean every user have their 
own Cart.
## Features
<ul>
    <li>Account registration system</li>
    <li>username and password for login</li>
    <li>Landing page which displays a grid of product cards</li>
    <li>Each product card has product's image, title, price, and a brief description</li>
    <li>Data from the Fake Store API </li>
    <li>Cart system where users can add products. And when the user clicks the purchase button, it will save the cart's data.</li>
    <li>Users can see how much he has spent on every category.</li>
    <li>Responsive UI and mobile-friendly</li>
    <li>Admin account and only this user can create, update and delete products</li>
    <li>Pagination to display a limited number of products per page and users can navigate between pages</li>
    <li>Search bar that allows users to search for products based on their titles or descriptions.</li>
    <li>User can sort products based on price</li>
    <li>Implementing local storage</li>
    <li>Clean and well-structured code, following best practices and industry standards.</li>
  </ul>
  <br>
  I mean all the feature are available which stated in the assignment docs.
  
  ## Additional Packages
  <ul>
  <li>Tailwind CSS - For UI Styling</li>
  <li>React Paginate - For Pagination</li>
  <li>React Router Dom - For Routing</li>
  <li>UUID - For generating Unique ID</li>
  <li>Axios - Axios is a promise-based HTTP Client for node.js and the browser</li>
  <li>React Tostify - For showing Nice Messages</li>
  </ul>
  <br>
  And That's it...
