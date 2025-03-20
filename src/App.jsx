import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { lazy, Suspense } from "react";
import Progress from "./components/ui/Progress"

function App() {

  return (
    <Suspense fallback={<Progress />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App;