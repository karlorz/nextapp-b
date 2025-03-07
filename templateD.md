### 🤖 Assistant

Designing a web application template that meets your requirements involves careful planning to ensure modularity, scalability, and flexibility. Below is a detailed breakdown of how you can design such a template using React.js, Supabase, OpenAPI schema/sdk client auto-generation, and other tools:

---

### **1. Core Technology Stack**
- **Frontend**: React.js (with functional components and hooks)
- **Backend**: Supabase (PostgreSQL database + serverless functions)
- **ORM Client**: Prisma (for type-safe database interactions)
- **API Auto-Generation**: OpenAPI schema + Swagger Codegen or OpenAPI Generator
- **Edge Computing**: Deno (for serverless functions or edge APIs)
- **Packaging**: Electron (for desktop application compatibility)

---

### **2. Architecture Overview**
The architecture will follow a **micro-frontend** approach with clear separation of concerns:
- **Frontend**: React.js for UI and client-side logic.
- **Backend**: Supabase for database and serverless functions, with Prisma as the ORM.
- **Edge Computing**: Deno for lightweight, serverless APIs or edge functions.
- **Auto-Generated SDK**: Use OpenAPI to generate a client SDK for interacting with external APIs.

---

### **3. Key Features of the Template**
#### **Frontend (React.js)**
- **Modular Structure**:
  - Use a folder-based structure for components, hooks, services, and pages.
  - Example:
    ```
    src/
    ├── components/  # Reusable UI components
    ├── hooks/       # Custom hooks (e.g., auth, data fetching)
    ├── services/    # API clients and business logic
    ├── pages/       # Page components
    ├── context/     # Global state management
    └── utils/       # Utility functions
    ```
- **State Management**: Use React Context or Zustand for lightweight state management. Avoid Redux unless absolutely necessary.
- **API Integration**: Use Supabase's client library for database interactions and serverless functions for custom logic.
- **Edge Functions**: Offload heavy computations or edge-specific tasks to Deno.

#### **Backend (Supabase + Prisma)**
- **Database**: PostgreSQL with Prisma as the ORM.
- **Serverless Functions**: Use Supabase's Edge Functions or Deno Deploy for lightweight APIs.
- **Authentication**: Use Supabase's built-in authentication system.
- **OpenAPI SDK**: Generate an SDK from your OpenAPI schema to interact with external services.

#### **Edge Computing (Deno)**
- Deploy lightweight APIs or edge functions using Deno Deploy.
- Example use cases:
  - Preprocessing data before sending it to the frontend.
  - Handling authentication or authorization logic.
  - Fetching data from third-party APIs.

#### **Auto-Generated SDK**
- Use OpenAPI Generator to create a TypeScript SDK for interacting with external APIs.
- Integrate the SDK into your React app for seamless communication with third-party services.

---

### **4. Implementation Steps**
#### **Step 1: Set Up the Backend**
1. **Initialize Supabase**:
   - Create a Supabase project and configure the PostgreSQL database.
   - Use Prisma to define your database schema and generate type-safe queries.
2. **Create Serverless Functions**:
   - Write serverless functions in Supabase for backend logic.
   - Use Deno Deploy for edge-specific functions if needed.
3. **Generate OpenAPI SDK**:
   - Define your API schema in OpenAPI format.
   - Use Swagger Codegen or OpenAPI Generator to create a TypeScript SDK.

#### **Step 2: Build the Frontend**
1. **Initialize React App**:
   - Use `create-react-app` or Vite for a fast development experience.
2. **Integrate Supabase**:
   - Use the Supabase JavaScript client to connect to the database and call serverless functions.
3. **Modularize Code**:
   - Follow the folder structure suggested above to keep the codebase clean and maintainable.
4. **Auto-Generated SDK Integration**:
   - Import the generated SDK into your React app and use it to interact with external APIs.

#### **Step 3: Optimize for Electron**
1. **Prepare for Desktop Compatibility**:
   - Use conditional rendering to adapt the UI for desktop vs. web.
   - Replace browser-specific APIs (e.g., `window.localStorage`) with Electron equivalents.
2. **Package the App**:
   - Use `electron-builder` or `Tauri` to package the React app as a desktop application.
   - Ensure that Supabase and other dependencies work in the Electron environment.

---

### **5. Example Code Snippets**
#### **Supabase + Prisma Setup**
```typescript
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}
```

```bash
# Run Prisma migrations
npx prisma migrate dev --name init
```

#### **React + Supabase Integration**
```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

async function fetchUserData() {
  const { data, error } = await supabase.from('users').select('*');
  if (error) console.error(error);
  return data;
}
```

#### **Deno Edge Function**
```typescript
export default defineEventHandler(async (event) => {
  const { user } = await handleAuth(event); // Supabase edge auth
  return new Response(JSON.stringify({ message: 'Hello, world!', user }));
});
```

#### **Electron Main Process**
```javascript
const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadURL('http://localhost:3000'); // Load React app
}

app.whenReady().then(createWindow);
```

---

### **6. Deployment Strategy**
- **Web**: Deploy the React app using Vercel, Netlify, or GitHub Pages. Use Supabase's hosting for serverless functions.
- **Desktop**: Package the app using Electron or Tauri.
- **Edge Functions**: Deploy Deno functions using Deno Deploy.

---

### **7. Advantages of This Template**
- **Modularity**: Clear separation of concerns between frontend, backend, and edge logic.
- **Scalability**: Leverage Supabase's serverless architecture for cost-effective scaling.
- **Flexibility**: Use Deno for edge computing and Electron for desktop compatibility.
- **Ease of Porting**: The modular design makes it easy to adapt the template for different environments.

This template provides a solid foundation for building modern web applications with minimal reliance on the backend, while maintaining flexibility for future enhancements.