<template>
  <v-row>
    <v-col class="">
      <h1>SQL Query App</h1>

      <h2>1. Overview</h2>

      <p>
        The SQL Query App is a web application built with Nuxt.js, providing users with the ability to input SQL queries,
        simulate their execution, and display the results. This document outlines the key components, features, and design
        decisions.
      </p>

      <h2>2. Architecture</h2>

      <h3>Frontend</h3>

      <ul>
        <li>Built with Nuxt.js for server-side rendering and Vue.js for reactive components.</li>
        <li>Utilizes Vuex for state management, managing user-input queries, and the resulting data.</li>
        <li>Employs a modular component structure for reusability and maintainability.</li>
        <li>Integrates PusherJs for real-time features.</li>
      </ul>

      <h2>3. Features</h2>

      <h3>SQL Query Input</h3>

      <ul>
        <li>Accepts user input through a textarea.</li>
        <li>Provides a "Run Query" button to initiate query execution.</li>
      </ul>

      <h3>Query Execution</h3>

      <ul>
        <li>Simulates query execution with dummy data.</li>
        <li>Uses Vuex mutations to update the application state with the query results.</li>
      </ul>

      <h3>Real-Time Updates</h3>

      <ul>
        <li>Utilizes PusherJs for real-time updates when a query is executed. (Future feature)</li>
        <li>Listens for real-time events and updates the application state accordingly.</li>
      </ul>

      <h3>User Interface</h3>

      <ul>
        <li>Implements a simple and intuitive UI with a responsive design.</li>
        <li>Displays query results in a tabular format.</li>
        <li>Allows users to toggle between predefined queries using a dropdown menu. (Future feature)</li>
      </ul>

      <h2>4. Security Considerations</h2>

      <h3>SQL Injection Prevention</h3>

      <ul>
        <li>Sanitizes user-input queries to prevent SQL injection attacks.</li>
      </ul>

      <h2>5. Future Improvements</h2>

      <h3>Backend Integration</h3>

      <ul>
        <li>Explore the possibility of integrating a backend with a database for real SQL query execution.</li>
      </ul>

      <h3>Enhanced Error Handling</h3>

      <ul>
        <li>Implement more robust error handling mechanisms for better user feedback.</li>
      </ul>

      <h3>Performance Optimization</h3>

      <ul>
        <li>Optimize the application for larger datasets and complex queries.</li>
      </ul>

      <h3>User Authentication</h3>

      <ul>
        <li>Integrate user authentication for personalized features.</li>
      </ul>

      <h2>6. Testing</h2>

      <h3>Unit Testing</h3>

      <ul>
        <li>Implement unit tests for critical application logic and components.</li>
      </ul>

      <h3>Integration Testing</h3>

      <ul>
        <li>Consider adding integration tests to ensure the correct interaction between components.</li>
      </ul>

      <h2>7. Deployment</h2>

      <h3>Containerization</h3>

      <ul>
        <li>Consider Dockerizing the application for consistent deployment.</li>
      </ul>

      <h3>Hosting</h3>

      <ul>
        <li>Choose a cloud platform such as AWS or Netlify for deployment.</li>
      </ul>

      <h2>8. Collaboration</h2>

      <h3>Version Control</h3>

      <ul>
        <li>Use Git for version control and follow branching and merging best practices.</li>
      </ul>

      <h3>Code Review</h3>

      <ul>
        <li>Encourage code reviews among team members for quality assurance.</li>
      </ul>

      <p class="">
        Load time
        Load time measured by Google Chrome Lighthouse:load time
      </p>
      <img class="w-full h-full ml-0 mt-4 object-contain" src="@/static/load-time.png" height="600px" width="600px" />

      <img class="w-full h-full mt-4 object-contain" src="@/static/flowDiagram.png" height="600px" width="600px" />

      <p class="mt-4">Walkthrough Video</p>
      <a href="https://drive.google.com/file/d/1yesoOxvLTioWt17BKO2QIZnuDy1pOFNn/view?usp=sharing"></a>
      <p class="mt-4">Github Link</p>
      <a href="https://github.com/mukesh897/Atlan-Assignment"></a>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ReadMe'
}

</script>
