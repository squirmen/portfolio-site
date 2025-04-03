import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

export default function Page() {
  const [darkModeEnabled, setDarkModeEnabled] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });
  const [zoteroItems, setZoteroItems] = useState([]);
  const [activeTab, setActiveTab] = useState("All");

  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    let ignore = false;
    fetch("/.netlify/functions/zotero")
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) setZoteroItems(data);
      });
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", darkModeEnabled.toString());
    }
  }, [darkModeEnabled]);

  const projects = [
    {
      title: "NZ Road Deaths Tracker",
      category: "Dashboard",
      type: "iframe",
      src: "https://nzroads.tfwelch.com/embed.php",
      description: "A unique visual approach to understanding trends in road safety across NZ.",
      link: "https://nzroads.tfwelch.com",
      details: "Built using JavaScript and Chart.js, normalized by service days. Widely shared by NZ media and transport agencies.",
    },
    {
      title: "Cycleway Dashboard",
      category: "Dashboard",
      type: "image",
      src: "/images/cycleway_dashboard.png",
      description: "Live cycleway usage trends, leaderboard, anomaly detection & more.",
      link: "https://cycleway.tfwelch.com",
      details: "Built in Chart.js + Bootstrap, analyzing Auckland cycle counters across 75 locations. Includes filtering, rolling averages, and anomaly detection.",
    },
    {
      title: "Te Huia Train Ridership",
      category: "Visualization",
      type: "image",
      src: "/images/te_huia.png",
      description: "Monthly passenger growth trends and service normalization from 2022 to 2025.",
      details: "Visualization using matplotlib and pandas, showing normalized trends vs. raw passenger counts.",
    },
    {
      title: "Auckland Metro Animation",
      category: "Visualization",
      type: "video",
      src: "/videos/AT_Metro.mp4",
      description: "Animated GTFS-based map of all public transport services in Auckland in one day.",
      details: "Generated using Python, Mapbox, and GTFS real-time feed. Shows comprehensive mode integration across a day.",
    },
    {
      title: "Auckland Harbour Bridge Traffic",
      category: "Visualization",
      type: "video",
      src: "/videos/ahb_traffic.mp4",
      description: "Animated graph of traffic flow and road capacity across the Auckland Harbour Bridge.",
      details: "Traffic data mapped against bridge capacity showing congestion thresholds in a 24-hour cycle.",
    },
    {
      title: "CO₂ Footprint Calculator",
      category: "Tool",
      type: "image",
      src: "/images/co2_tool.png",
      description: "Estimate your personal transportation carbon footprint with a user-friendly tool.",
      link: "https://welch.shinyapps.io/CO2_Footprint/",
      details: "Built in R + Shiny, this tool compares cost and CO₂ by transport mode, distance, and frequency.",
    },
    {
      title: "Bus Stop Amenity Index",
      category: "Research",
      type: "image",
      src: "/images/bus_amenity.png",
      description: "Auckland-wide map of amenity availability and equity across 5,000+ bus stops.",
      details: "Research tool using Leaflet and OpenStreetMap overlays to visualize access disparities.",
    },
  ];

  const categories = ["All", "Dashboard", "Visualization", "Tool", "Research"];
  const filteredProjects = activeTab === "All" ? projects : projects.filter((p) => p.category === activeTab);

  return (
    <div className={darkModeEnabled ? "dark bg-black text-white" : "bg-white text-black"}>
      <div className="relative overflow-hidden animate-gradient bg-gradient-to-br from-sky-50 via-blue-100 to-white dark:from-black dark:via-gray-900 dark:to-gray-800 border-b p-8 flex flex-col md:flex-row justify-between items-center bg-cover bg-center" style={{ backgroundImage: 'url(/images/header-background.jpg)' }}>
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold drop-shadow">Timothy F. Welch</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Urban planning, transport analytics, and data storytelling</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setDarkModeEnabled(!darkModeEnabled)}>
            {darkModeEnabled ? "Light Mode" : "Dark Mode"}
          </Button>
          <a href="#projects">
            <Button variant="outline">Projects</Button>
          </a>
          <a href="#publications">
            <Button variant="outline">Publications</Button>
          </a>
        </div>
      </div>

      <div id="projects" className="p-4">
        <div className="mb-4 flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <Button key={cat} variant={cat === activeTab ? "default" : "outline"} onClick={() => setActiveTab(cat)}>
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filteredProjects.map((project, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Card className="transition-all hover:scale-[1.01] hover:shadow-lg cursor-pointer">
                  <CardContent>
                    {project.type === "image" && <img loading="lazy" src={project.src} alt={project.title} className="w-full rounded-xl" />}
                    {project.type === "iframe" && (
                      <iframe loading="lazy" src={project.src} width="100%" height="300" frameBorder="0" scrolling="no" className="rounded-xl"></iframe>
                    )}
                    {project.type === "video" && (
                      <video controls loading="lazy" className="w-full rounded-xl">
                        <source src={project.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    <h2 className="text-xl font-semibold mt-2">{project.title}</h2>
                    <p className="mt-1 text-sm">{project.description}</p>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <Button className="mt-2">Explore</Button>
                      </a>
                    )}
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>{project.title}</DialogTitle>
                <p className="text-sm whitespace-pre-line">{project.details}</p>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>

      <div id="publications" className="p-4 mt-10">
        <h2 className="text-2xl font-bold mb-4">Publications</h2>
        {zoteroItems.length === 0 ? (
          <p>Loading publications from Zotero…</p>
        ) : (
          <ul className="list-disc pl-5 space-y-3">
            {zoteroItems.map((item) => (
              <li key={item.key} className="text-sm">
                <strong>{item.data.title}</strong>
                {item.data.publicationTitle && <span> — <em>{item.data.publicationTitle}</em></span>}
                {item.data.date && <span>, {item.data.date}</span>}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4 text-sm">
          Full list available on {" "}
          <a
            href="https://scholar.google.com/citations?user=KDf4PW0AAAAJ&hl=en"
            className="text-blue-600 underline"
            target="_blank"
          >
            Google Scholar
          </a>.
        </p>
      </div>

      <footer className="p-4 mt-10 border-t text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Timothy F. Welch</p>
        <p>
          <a href="mailto:t.welch@auckland.ac.nz" className="underline">Email</a> |
          <a href="https://github.com/squirmen" className="underline ml-2" target="_blank" rel="noopener noreferrer">GitHub</a> |
          <a href="https://bsky.app/profile/twelch.bsky.social" className="underline ml-2" target="_blank" rel="noopener noreferrer">Bluesky</a> |
          <a href="https://www.linkedin.com/in/tfwelch/" className="underline ml-2" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </p>
      </footer>
    </div>
  );
}
