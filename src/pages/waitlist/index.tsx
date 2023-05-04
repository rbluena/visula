import { MainLayout } from "@/components";
import Nav from "@/components/layouts/Nav";

const Waitlist = () => {
  return (
    <MainLayout headTitle="Visula - Waitlist">
      <Nav />
      <div className="max-h-screen overflow-hidden pt-[60px]">
        <iframe
          className="airtable-embed"
          src="https://airtable.com/embed/shre174eu7R9ql5FU?backgroundColor=blue"
          width="100%"
          style={{ height: "100vh", background: "transparent" }}
          // style="background: transparent; border: 1px solid #ccc;"
        />
      </div>
    </MainLayout>
  );
};

export default Waitlist;
