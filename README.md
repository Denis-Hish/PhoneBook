## Running This Sample Locally

555555

1. Create DB: https://account.mongodb.com/account/login

-  Connect to Cluster -> Connect your application -> copy "connection string" and add to .env DB_URL

2. Install the dependencies in "root" with npm: npm install

3. Install the dependencies in "client" with npm: npm install

4. Create `.env` and add values:

-  BASEURL=http://localhost:8080
-  DB_URL='mongodb+srv://user:password.mongodb.net/?retryWrites=true&w=majority'

5. Run the sample app (ui + server): npm run dev

To run server only:

```
node server.js OR npm run start


The app will be served at `localhost:3000`.


### Deployment

Create new Node.js app with param:
- Application root - my.site.com
- Application URL - my.site.com
- Application startup file - index.js
Upload Node files and React build folder
Run npm install

### MongoDb
https://www.youtube.com/watch?v=scVi_6xqAEc&ab_channel=Headhonk

### Axios requests example
https://github.com/yatharth1706/PhoneBook/blob/master/app.js
```
