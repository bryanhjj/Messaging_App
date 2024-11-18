import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      loader: rootLoader,
      action: rootAction,
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <Index />,
            },
            {
              path: "contacts/:contactId",
              element: <Contact />,
              loader: contactLoader,
              action: contactAction,
            },
            {
              path: "contacts/:contactId/edit",
              element: <EditContact />,
              loader: contactLoader, // p.s. tutorial is just being lazy, we don't usually share loaders
              action: editAction,
            },
            {
              path: "contacts/:contactId/destroy",
              action: destroyAction,
              errorElement: <div>Oops! There was an error.</div>,
            }
          ], 
        },
      ],
    },
]);
  
createRoot(document.getElementById('root')).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
);