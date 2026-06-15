import { Link } from "react-router-dom";
import { ArrowLeft, Briefcase, GraduationCap, CheckCircle2, MessageSquare, Plus } from "lucide-react";

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
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Blocky Header Bar */}
      <header className="border-b-2 border-slate-900 bg-white sticky top-0 z-40 px-6 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/roadmaps"
              className="p-2 bg-yellow-400 hover:bg-yellow-300 text-slate-900 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_rgba(0,0,0,1)] shrink-0 transition-all hover:-translate-y-0.5 cursor-pointer flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">
                User Profile
              </h1>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-8 lg:py-12">
        {/* Profile Info Card */}
        <div className="rounded-xl border-2 border-slate-900 bg-white p-6 sm:p-8 shadow-[6px_6px_0px_rgba(0,0,0,1)] mb-8 transition-transform">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            
            {/* Avatar Block */}
            <div className="flex flex-col items-center gap-4 p-6 rounded-xl border-2 border-slate-900 bg-blue-50 w-full md:w-64 shadow-[4px_4px_0px_rgba(0,0,0,1)] shrink-0 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-3 bg-blue-500 border-b-2 border-slate-900"></div>
              
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-slate-900 bg-yellow-400 text-4xl font-black text-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] relative z-10 mt-2">
                AN
              </div>
              <div className="text-center relative z-10">
                <p className="text-lg font-black text-slate-900">Nguyen Van A</p>
                <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 border-2 border-slate-900 font-mono shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  Senior ML Engineer
                </span>
              </div>
            </div>

            {/* Detailed Stats Block */}
            <div className="flex-1 space-y-5 w-full">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
                  Nguyen Van A
                </h2>
                <span className="font-mono text-sm font-bold bg-slate-100 border-2 border-slate-900 px-3 py-1 rounded-md shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  @alex.nguyen
                </span>
                <span className="inline-flex items-center gap-1.5 font-bold bg-emerald-100 text-emerald-800 border-2 border-emerald-500 px-3 py-1 rounded-md shadow-[2px_2px_0px_#10b981] text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  Verified
                </span>
              </div>

              <div className="space-y-2 text-sm font-medium text-slate-600 font-sans border-l-4 border-yellow-400 pl-4 py-1">
                <p><strong className="text-slate-900 font-black">Role:</strong> Senior Machine Learning Engineer - 5 years experience</p>
                <p><strong className="text-slate-900 font-black">Specialization:</strong> AI Researcher, Data Engineer, NLP</p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button className="flex items-center gap-2 rounded-lg border-2 border-slate-900 bg-yellow-400 px-6 py-2.5 text-sm font-black text-slate-900 transition-all shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,1)] cursor-pointer">
                  <Plus className="w-4 h-4" /> Follow
                </button>
                <button className="flex items-center gap-2 rounded-lg border-2 border-slate-900 bg-white px-6 py-2.5 text-sm font-black text-slate-900 transition-all shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,1)] cursor-pointer hover:bg-slate-50">
                  <MessageSquare className="w-4 h-4" /> Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grids */}
        <div className="grid gap-8 lg:grid-cols-2">
          
          {/* Experience Timeline */}
          <section className="rounded-xl border-2 border-slate-900 bg-amber-50 p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <div className="mb-6 flex items-center gap-3 border-b-2 border-slate-900 pb-4">
              <div className="p-2 bg-amber-400 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                <Briefcase className="w-5 h-5 text-slate-900" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Experience</h3>
                <p className="text-[10px] font-bold text-amber-800 font-mono uppercase tracking-widest mt-0.5">Selected roles & contributions</p>
              </div>
            </div>

            <div className="space-y-4">
              {experienceItems.map((item, idx) => (
                <div key={idx} className="rounded-lg border-2 border-slate-900 bg-white p-5 shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h4 className="text-base font-black text-slate-900 leading-tight">{item.company}</h4>
                      <p className="text-sm font-bold text-blue-600 mt-1">{item.title}</p>
                    </div>
                    <div className="text-right text-[10px] font-mono font-bold bg-slate-100 px-2 py-1.5 rounded border-2 border-slate-900 shadow-[1px_1px_0px_#0f172a]">
                      <span className="block text-slate-800 uppercase tracking-wider">{item.period}</span>
                      <span className="block text-slate-500 mt-0.5 border-t border-slate-300 pt-0.5">{item.duration}</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Education Timeline */}
          <section className="rounded-xl border-2 border-slate-900 bg-emerald-50 p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <div className="mb-6 flex items-center gap-3 border-b-2 border-slate-900 pb-4">
              <div className="p-2 bg-emerald-400 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                <GraduationCap className="w-5 h-5 text-slate-900" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Education</h3>
                <p className="text-[10px] font-bold text-emerald-800 font-mono uppercase tracking-widest mt-0.5">Academic & certifications</p>
              </div>
            </div>

            <div className="space-y-4">
              {educationItems.map((item, idx) => (
                <div key={idx} className="rounded-lg border-2 border-slate-900 bg-white p-5 shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="flex-1 pr-4">
                      <h4 className="text-base font-black text-slate-900 leading-tight">{item.institution}</h4>
                      <p className="text-sm font-bold text-emerald-600 mt-1">{item.degree}</p>
                    </div>
                    <div className="text-[10px] font-mono font-bold bg-emerald-100 px-2 py-1.5 rounded border-2 border-slate-900 shadow-[1px_1px_0px_#0f172a] shrink-0 uppercase tracking-wider">
                      <span className="text-emerald-900">{item.period}</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </section>
    </main>
  );
}
