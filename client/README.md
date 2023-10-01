# Elife

## Technology and library used 
- React
- Nextjs 13
- Typescript
- Tailwindcss
- Redux with redux toolkit
- Nodejs
- Mongodb

## Elife a socail platform for users to sahre their current tvshow or music they wathcing or listening
1. Sign in, sign up.
2. User can post their song or tvshow (searching by using a 3rd party api from spotify and moviedb)
3. Search and follow user
4. Update avatar
5.  protect route using middleware
...

## Explain some architecture concepts and how technologies in this project work.
1. How i used redux and redux toolkit with Nextjs

 In common react application we can wrap the entire app with Provider from react-redux but with Nextjs 13 we have to deal with things called client component and
 server component. By default my entire application is in the layout.tsx which by default should be a server component while the redux and others state management library
 is client component. So to use the Provider in the layout.tsx we have to convert that to client component which is break the Nextjs concept.
 
 Solution: I created a new ReduxProvider used client side and wrap the application with that provider.


   
   
