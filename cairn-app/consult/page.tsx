import type { Metadata } from "next";
import { ConsultForm } from "@/components/ConsultForm";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Project consultation",
  description:
    "Submit a project brief: the objective, the constraint, and where the system has to run.",
};

export default function ConsultPage() {
  return (
    <div className="page">
      <div className="wrap consult-grid">
        <PageHero
          kicker="Consultation"
          title="Describe the requirement."
          lede="Name the objective, the limit that cannot move, and the place the system has to run. A short, specific brief is more useful than a long one that avoids the constraint."
        />
        <div>
          <ConsultForm />
          <p className="disclaimer">
            Submitting stores the brief on this server and shows you a reference
            code. It does not send email. Wire the form to your mailbox before you
            treat it as a public intake.
          </p>
        </div>
      </div>
    </div>
  );
}
