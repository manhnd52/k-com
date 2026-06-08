import { Link } from "react-router-dom";

const experienceItems = [
  {
    company: "OpenAI Research Lab",
    title: "Machine Learning Engineer",
    period: "2021 to Now",
    duration: "4 years",
    description:
      "Leading applied research projects in NLP, model evaluation, and deployment for production-grade AI experiences.",
  },
  {
    company: "ABC Tech",
    title: "Data Scientist",
    period: "2019 to 2021",
    duration: "2 years",
    description:
      "Built end-to-end data pipelines, developed predictive models, and partnered with product teams to deliver analytics solutions.",
  },
];

const educationItems = [
  {
    institution: "Hanoi University of Science and Technology",
    degree: "Bachelor's Degree - Computer Science",
    period: "2015 to 2019",
    description: "Graduated with strong academic performance in algorithms, systems, and AI fundamentals.",
  },
  {
    institution: "Online Certification",
    degree: "Deep Learning Specialization",
    period: "6 months",
    description: "Completed advanced coursework on neural networks, computer vision, and natural language processing.",
  },
];

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#F3F2EF] text-[#000000E6]">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="mb-6 flex items-center gap-3 text-sm text-[#6B7280]">
          <Link
            to="/roadmaps"
            className="inline-flex items-center gap-2 rounded-full border border-[#E0E0E0] bg-[#FFFFFF] px-3 py-2 text-sm text-[#6B7280] transition hover:border-brand hover:text-brand"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Return
          </Link>
        </div>

        <div className="rounded-[30px] border border-[#E0E0E0] bg-[#FFFFFF] p-6 sm:p-8">
          <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:items-center">
            <div className="flex flex-col items-center gap-5 rounded-3xl border border-[#E0E0E0] bg-[#F8F9FA] p-6 text-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-[#F0F0F0] text-4xl font-semibold text-[#000000E6]">
                AN
              </div>
              <div>
                <p className="text-sm font-semibold text-[#000000E6]">Nguyen Van A</p>
                <p className="mt-1 text-xs text-[#9CA3AF]">Senior Machine Learning Engineer</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-3xl font-semibold tracking-tight text-[#000000E6]">
                    Nguyen Van A
                  </h1>
                  <span className="rounded-full border border-[#E0E0E0] bg-[#F0F0F0] px-3 py-1 text-sm text-[#6B7280]">
                    @alex.nguyen
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#E0E0E0] bg-[#F0F0F0] px-3 py-1 text-sm text-[#6B7280]">
                    <svg className="h-4 w-4 text-brand" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Verified
                  </span>
                </div>

                <div className="space-y-2 text-sm text-[#6B7280]">
                  <p>Senior Machine Learning Engineer - 5 years experience</p>
                  <p>Domain / Specialization: AI Researcher, Data Engineer, NLP</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-hover">
                  Follow
                </button>
                <button className="rounded-lg border border-[#E0E0E0] bg-transparent px-5 py-2.5 text-sm font-medium text-[#000000E6] transition hover:border-brand hover:text-brand">
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-[26px] border border-[#E0E0E0] bg-[#FFFFFF] p-6 sm:p-8">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#000000E6]">Experience</p>
                <p className="mt-1 text-sm text-[#9CA3AF]">Selected roles and contributions</p>
              </div>
            </div>

            <div className="space-y-5">
              {experienceItems.map((item) => (
                <div key={item.company} className="rounded-3xl border border-[#E0E0E0] bg-[#F8F9FA] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-[#000000E6]">{item.company}</p>
                      <p className="mt-1 text-sm text-[#6B7280]">{item.title}</p>
                    </div>
                    <div className="text-right text-xs text-[#9CA3AF]">
                      <p>{item.period}</p>
                      <p className="mt-1">{item.duration}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#6B7280]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[26px] border border-[#E0E0E0] bg-[#FFFFFF] p-6 sm:p-8">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[#000000E6]">Education</p>
                <p className="mt-1 text-sm text-[#9CA3AF]">Academic background and certifications</p>
              </div>
            </div>

            <div className="space-y-5">
              {educationItems.map((item) => (
                <div key={item.institution} className="rounded-3xl border border-[#E0E0E0] bg-[#F8F9FA] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-[#000000E6]">{item.institution}</p>
                      <p className="mt-1 text-sm text-[#6B7280]">{item.degree}</p>
                    </div>
                    <p className="text-xs text-[#9CA3AF]">{item.period}</p>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#6B7280]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
