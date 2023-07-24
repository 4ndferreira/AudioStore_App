# PB-Compass-Challenge-III

## Instructions for the Challenge:

![Captura de Tela (4)](https://github.com/4ndferreira/PB-Compass-Challenge-III/assets/97910606/9cfc55af-4517-4128-892c-50f434ae69a9)
UI (https://www.figma.com/file/MgpXAAjgKFfbw2V7ZDmiQn/Challenge-03---Week-12?type=design&node-id=4%3A1&mode=design&t=exbcXTvkbp26juDy-1)

You’ll need to recreate the page mentioned above, staying loyal to its original design using React.

It’s recommended using [Vite](https://vitejs.dev/guide/) to initialize your React application.

The mandatory requirements are:

- Use [**Firebase**](https://firebase.google.com/) for user authentication;
- Use TypeScript;
- Create a mobile design;
- Copy the JSON file below and paste it into [**Run Mocky**](https://designer.mocky.io/) to create an API;
- Use the link that you created in Run Mocky to perform requests;
- Create carousels for products in the main page (use whatever library you prefer/like)
- Create a text filter for products names;
- Conditional rendering of products in the home page based on the category;
- By clicking in a product card, user must be redirected to product page;
- Render all the reviews existing in the API for each product;
- Another products section can be whatever products carousel you want;
- By clicking the “Add To Cart” button, the product must be added to the cart;
- Use Context API to manage the cart;
- The products must be removable from the cart;
- The products can be added as many times as user wants;
- The filter screen needs to be a bottom sheet (use [**React Sprint Bottom Sheet**](https://react-spring.bottom-sheet.dev/));
- The filter screen will be triggered on the click of “Filter” button;
- Implement the filter using the products from API;
- In the cart screen, calculate the total value based on the products added.

The optional requirements are:

- Use the GraphQL API instead the REST API provided;
- Deploy on any platform;
- Docker for deploy;
- Design for desktop;
- The navbar in the home page;
- Use Firebase with Clerk and render the user photo in the navbar.
  
Comments:

- You can use whatever styling approach you prefer;
- You can use whatever way you want to initialize your project;
- You can use Next.js

## How to run the project:

- Download the repository via the zip file or from the terminal using git clone;
- Access the project directory through your terminal;
- Run `yarn init -y` to initialize yarn within the project.
- Run the `yarn add` command to install the dependencies.
- Run the `yarn dev` command to start the project
- Open your browser and run http://localhost:5173/
