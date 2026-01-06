import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/animate-ui/components/radix/dialog";
import { WebGLShader } from "@/components/ui/web-gl-shader";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { FloatingDock } from "./ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandLeetcode,
  IconBrandLinkedin,
  IconDownload,
  IconMail,
} from "@tabler/icons-react";

const FORM_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

export default function DemoOne() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formStatus, setFormStatus] = useState({ state: "idle", message: "" });

  const dockItems = [
    {
      title: "GitHub",
      href: "https://github.com/GSaiKiran15",
      icon: <IconBrandGithub className="h-5 w-5" />,
    },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/saikiranganeshkumar/",
      icon: <IconBrandLinkedin className="h-5 w-5" />,
    },
    {
      title: "Contact",
      href: "mailto:ganeshsaikiran7@gmail.com",
      icon: <IconMail className="h-5 w-5" />,
    },
    {
      title: "LeetCode",
      href: "https://leetcode.com/u/SaiKiran15/",
      icon: <IconBrandLeetcode className="h-5 w-5" />,
    },
    {
      title: "Resume",
      href: "/resume.pdf",
      download: true,
      icon: <IconDownload className="h-5 w-5" />,
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setFormStatus({ state: "loading", message: "" });

    if (!FORM_ENDPOINT) {
      setFormStatus({
        state: "error",
        message:
          "Set VITE_CONTACT_ENDPOINT (e.g. Formspree URL) in your .env to enable sending.",
      });
      return;
    }

    const formData = new FormData(form);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const isOk = response.ok || response.status === 302;
      if (!isOk) {
        let errorText = "Request failed";
        try {
          const data = await response.json();
          errorText = data?.message || data?.error || errorText;
        } catch (_) {
          // ignore parse errors
        }
        throw new Error(errorText);
      }

      setFormStatus({ state: "success", message: "Sent! Check your inbox." });
      if (form) {
        form.reset();
      }
      setTimeout(() => setDialogOpen(false), 500);
    } catch (error) {
      setFormStatus({
        state: "error",
        message:
          error?.message || "Could not send. Try again or verify the endpoint.",
      });
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      <WebGLShader />
      <div className="pointer-events-none absolute right-4 top-4 z-50">
        <FloatingDock
          items={dockItems}
          desktopClassName="pointer-events-auto shadow-lg"
          mobileClassName="pointer-events-auto"
        />
      </div>
      <div className="relative border border-[transparent] p-2 w-full mx-auto max-w-3xl">
        <main className="relative border border-[transparent] py-10 overflow-hidden">
          <h1 className="mb-50 text-white text-center text-7xl font-extrabold tracking-tighter md:text-[clamp(2rem,8vw,7rem)]">
            Sai Kiran G
          </h1>
          {/* <FloatingDock/> */}
          {/* <h1 className="mb-50 text-white text-center text-7xl font-extrabold tracking-tighter md:text-[clamp(2rem,8vw,7rem)]">Ganesh Kumar</h1> */}
          <div className="flex items-center justify-center px-6 text-center -mt-2 md:-mt-4">
            <p className="m-0 text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_0_22px_rgba(255,255,255,0.4)]">
              Building amazing web experiences at
              <span className="ml-3 bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 bg-clip-text text-transparent text-3xl md:text-[2.6rem] lg:text-[3rem] drop-shadow-[0_0_30px_rgba(56,189,248,0.6)]">
                warp speed
              </span>
            </p>
          </div>
          {/* <div className="my-8 flex items-center justify-center gap-1">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <p className="text-xs text-green-500">Available for New Projects</p>
          </div> */}
          <br></br>
          <div className="flex justify-center">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <LiquidButton
                  className="text-white border rounded-full"
                  size={"xl"}
                >
                  Contact Me
                </LiquidButton>
              </DialogTrigger>
              <DialogContent className="bg-neutral-950/90 backdrop-blur border-white/10 text-white">
                <DialogHeader>
                  <DialogTitle>Let&apos;s talk</DialogTitle>
                  <DialogDescription className="text-slate-300">
                    Drop your details and I&apos;ll reply soon.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-3">
                    <label
                      className="text-sm font-medium text-slate-200"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="grid gap-3">
                    <label
                      className="text-sm font-medium text-slate-200"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="grid gap-3">
                    <label
                      className="text-sm font-medium text-slate-200"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none"
                      placeholder="Tell me a bit about your project or question"
                    />
                  </div>
                  {!FORM_ENDPOINT && (
                    <p className="text-xs text-amber-300/90">
                      Set VITE_CONTACT_ENDPOINT to your form handler URL
                      (Formspree/Web3Forms) to deliver emails.
                    </p>
                  )}
                  {formStatus.message && (
                    <p
                      className={`text-sm ${
                        formStatus.state === "success"
                          ? "text-emerald-300"
                          : "text-red-300"
                      }`}
                    >
                      {formStatus.message}
                    </p>
                  )}
                  <DialogFooter>
                    <DialogClose
                      type="button"
                      className="rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:text-white"
                    >
                      Cancel
                    </DialogClose>
                    <button
                      type="submit"
                      disabled={formStatus.state === "loading"}
                      className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-cyan-400 to-indigo-500 px-4 py-2 text-sm font-semibold text-slate-950 transition focus:outline-none focus:ring-2 focus:ring-cyan-300 disabled:opacity-60"
                    >
                      {formStatus.state === "loading" ? "Sending..." : "Send"}
                    </button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
}
