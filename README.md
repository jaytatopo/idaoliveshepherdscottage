# Ida Olive Shepherd's Cottage Website

This is a [Next.js](https://nextjs.org/) application for the Ida Olive Shepherd's Cottage website, complete with a dynamic content management system (CMS) for the admin.

## Running the Project Locally

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Set Up Environment Variables:**
    Create a `.env` file in the root of the project and add your database credentials and other secret keys.
    ```
    DB_HOST=...
    DB_USER=...
    DB_PASSWORD=...
    DB_DATABASE=...
    RESEND_API_KEY=...
    ```

3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000). The admin portal is at `/admin`.

## Deploying to Production (Serverless Hosting)

This application is designed to be deployed to a **serverless hosting provider** that supports Node.js. Hosting on a platform without Node.js support will not work due to the app's dynamic, server-side features (like the admin panel and database).

**Recommended Host: Vercel**

[Vercel](https://vercel.com) is the creator of Next.js and provides the easiest and most powerful deployment experience.

1.  Push your code to a GitHub, GitLab, or Bitbucket repository.
2.  Sign up for a Vercel account (they have a generous free tier).
3.  Import your Git repository into Vercel.
4.  Configure the Environment Variables (see step 2 above) in the Vercel project settings.
5.  Vercel will automatically build and deploy your site.

Every time you push a change to your repository, Vercel will automatically redeploy the application.
