const Sidebar = (props: { children?: React.ReactNode; footer: string }) => (
  <aside className="top-16 flex flex-nowrap justify-between overflow-auto bg-neutral-200 p-4 shadow-lg max-md:mt-16 md:fixed md:bottom-0 md:left-0 md:w-60">
    <div className="flex flex-grow flex-col">
      <div>{props.children}</div>
      <div className="md:flex-grow"></div>
      <div className="mt-6 text-xs text-gray-600">
        <p>{props.footer}</p>
      </div>
    </div>
  </aside>
);

export default Sidebar;
