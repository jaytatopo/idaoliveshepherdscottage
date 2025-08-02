
# Ida Olive Shepherd's Cottage Website

This is a [Next.js](https://nextjs.org/) application for the Ida Olive Shepherd's Cottage website, complete with a dynamic content management system (CMS) for the admin.

This project is configured to use Vercel Postgres (powered by Neon) for the database and Vercel Blob for image storage.

## Deploying to Production with Vercel

[Vercel](https://vercel.com) provides the easiest and most powerful deployment experience for Next.js.

1.  **Push to Git:** Push your code to a GitHub, GitLab, or Bitbucket repository.
2.  **Import Project:** Sign up for a Vercel account and import your Git repository.
3.  **Set Up Postgres Database:**
    *   In your Vercel project dashboard, go to the **Storage** tab.
    *   Select **Postgres** and create a new database.
    *   After creation, connect it to your project. Vercel will automatically add the `POSTGRES_URL` environment variable.
4.  **Set Up Vercel Blob Storage:**
    *   In the same **Storage** tab, select **Blob** and create a new store.
    *   Connect it to your project. Vercel will automatically add the `BLOB_READ_WRITE_TOKEN` environment variable.
5.  **Set Up Database Schema:**
    *   In your Neon project dashboard (you can get there from Vercel's storage tab), navigate to the **SQL Editor**.
    *   Copy the entire content of the `sql/schema.sql` file from this repository.
    *   Paste the script into the SQL Editor and click **Run**. This will create all the necessary tables and populate them with default content. **Note:** This script is designed to be idempotent (safe to run multiple times). It will not affect your existing data.
6.  **Add Environment Variables:**
    *   In your Vercel project's **Settings -> Environment Variables**, add the following new variables:
        *   **`ADMIN_PASSWORD`**: A secure password you will use to log into the admin panel.
        *   **`RESEND_API_KEY`**: Your API key from [Resend](https://resend.com) for email notifications.
7.  **Deploy:** Vercel will automatically build and deploy your site. Any future pushes to your repository will trigger a new deployment.


## Running the Project Locally

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Set Up Environment Variables:**
    *   Create a `.env.local` file in the root of the project.
    *   Get your PostgreSQL connection string from Neon (it should be in the "Connection Details" on your Neon project dashboard).
    *   Get your Blob Read-Write token from Vercel's dashboard.
    *   Add the environment variables to your `.env.local` file:
    ```
    POSTGRES_URL="your_neon_connection_string"
    BLOB_READ_WRITE_TOKEN="your_vercel_blob_read_write_token"
    RESEND_API_KEY="your_resend_api_key"
    ADMIN_PASSWORD="a_very_secure_password_here"
    ```

3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000). The admin portal is at `/admin`.
