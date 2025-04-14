import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

export default function Page() {
  const [zoteroItems, setZoteroItems] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [showAbout, setShowAbout] = useState(false);

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

  // Function to extract YouTube video ID from a URL
  const getYouTubeVideoId = (url) => {
    if (!url || !url.includes('youtube.com') && !url.includes('youtu.be')) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Function to get YouTube thumbnail URL for a video ID
  const getYouTubeThumbnailUrl = (videoId) => {
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  };

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
      title: "Live Cycleway Counter",
      category: "Dashboard",
      type: "iframe",
      src: "https://cycleway.tfwelch.com/cycle-counter/",
      description: "Live counter of cycling trips on Auckland’s network.",
      link: "https://cycleway.tfwelch.com/cycle-counter/",
      details: "Embeddable real-time counter built from JSON data with animated display. Tracks daily and YTD trips across monitored cycleways.",
    },
    {
      title: "NZ Road Safety Dashboard",
      category: "Dashboard",
      type: "image",
      src: "https://assets.tfwelch.com/images/nzrddash_promo.gif",
      description: "An interactive dashboard offering comprehensive analytics on New Zealand road safety.",
      link: "https://nzroads.tfwelch.com/dashboard",
      details: "Features advanced filters for time, region, vehicle type, age, and gender, enabling users to explore fatality trends, temporal patterns, and demographic analyses. Aims to support evidence-based safety initiatives by providing insights into risk factors and high-risk periods.",
    },
    {
      title: "Cycleway Dashboard",
      category: "Dashboard",
      type: "image",
      src: "https://assets.tfwelch.com/images/cycleway_dashboard.png",
      description: "Live cycleway usage trends, leaderboard, anomaly detection & more.",
      link: "https://cycleway.tfwelch.com",
      details: "Built in Chart.js + Bootstrap, analyzing Auckland cycle counters across 75 locations. Includes filtering, rolling averages, and anomaly detection.",
    },
    {
      title: "Te Huia Train Ridership",
      category: "Visualization",
      type: "image",
      src: "https://assets.tfwelch.com/images/te_huia.png",
      description: "Monthly passenger growth trends and service normalization from 2022 to 2025.",
      details: "Visualization using matplotlib and pandas, showing normalized trends vs. raw passenger counts.",
    },
    {
      title: "Auckland Metro Animation",
      category: "Visualization",
      type: "video",
      src: "https://assets.tfwelch.com/videos/AT_Metro.mp4",
      description: "Animated GTFS-based map of all public transport services in Auckland in one day.",
      details: "Generated using Python, Mapbox, and GTFS real-time feed. Shows comprehensive mode integration across a day.",
    },
    {
      title: "Auckland Harbour Bridge Traffic",
      category: "Visualization",
      type: "video",
      src: "https://assets.tfwelch.com/videos/ahb_traffic.mov",
      description: "Animated graph of traffic flow and road capacity across the Auckland Harbour Bridge.",
      details: "Traffic data mapped against bridge capacity showing congestion thresholds in a 24-hour cycle.",
    },
    {
      title: "CO₂ Footprint Calculator",
      category: "Tool",
      type: "image",
      src: "https://assets.tfwelch.com/images/co2_tool.png",
      description: "Estimate your personal transportation carbon footprint with a user-friendly tool.",
      link: "https://welch.shinyapps.io/CO2_Footprint/",
      details: "Built in R + Shiny, this tool compares cost and CO₂ by transport mode, distance, and frequency.",
    },
    {
      title: "Bus Stop Amenity Index",
      category: "Research",
      type: "image",
      src: "https://assets.tfwelch.com/images/bus_amenity.png",
      description: "Auckland-wide map of amenity availability and equity across 5,000+ bus stops.",
      details: "Research tool using Leaflet and OpenStreetMap overlays to visualize access disparities.",
    },
  ];

  // Media appearances section
  const mediaAppearances = [
    {
      title: "TVNZ Breakfast - Floods and Infrastructure",
      outlet: "TVNZ",
      date: "2023",
      description: "Discussion on urban infrastructure resilience and flood mitigation strategies.",
      link: "https://www.youtube.com/watch?v=-TukXupo5Zg",
      featured: true
    },
    {
      title: "Fixing Auckland's Transport | The Deep Dive",
      outlet: "Newsroom",
      date: "2023",
      description: "Video essay on Auckland's transport history and car dependency, discussing solutions beyond large infrastructure projects.",
      link: "https://www.youtube.com/watch?v=odpbyt3SyQ8",
      featured: true
    },
    {
      title: "Will congestion charges solve Auckland's traffic woes?",
      outlet: "The Project NZ",
      date: "2023",
      description: "Analysis of Auckland's upcoming congestion charging system and international best practices.",
      link: "https://www.youtube.com/watch?v=ZRTeYSfQPsw",
      featured: true
    },
    {
      title: "Changes needed in Auckland CBD to avoid disaster congestion",
      outlet: "1News",
      date: "2023",
      description: "Interview about disaster preparedness and avoiding congestion during emergency situations in urban areas.",
      link: "https://www.youtube.com/watch?v=IWkxfc_mI94",
      featured: true
    },
    {
      title: "Creating 'sponge cities' to cope with more rainfall",
      outlet: "The Conversation",
      date: "August 14, 2023",
      description: "Analysis of how urban design can help manage increased rainfall without billion-dollar investments.",
      link: "https://theconversation.com/creating-sponge-cities-to-cope-with-more-rainfall-neednt-cost-billions-but-nz-has-to-start-now-211181",
      type: "article"
    },
    {
      title: "Road-heavy transport plans a bridge to nowhere",
      outlet: "Newsroom",
      date: "August 3, 2023",
      description: "Op-ed on sustainable transportation planning and alternatives to road-centric infrastructure.",
      link: "https://www.newsroom.co.nz/ideasroom/road-heavy-transport-plans-a-bridge-to-nowhere",
      type: "article"
    },
    {
      title: "70 years of road-based policies created today's problems",
      outlet: "The Conversation",
      date: "August 1, 2023",
      description: "Historical analysis of transportation policy and its impact on current urban challenges.",
      link: "https://theconversation.com/70-years-of-road-based-policies-created-todays-problems-does-nationals-transport-plan-add-up-210696",
      type: "article"
    }
  ];

  // Fetch more media items if needed
  const recentOpEds = [
    {
      title: "Your public transport, your future",
      outlet: "NewsRoom",
      date: "June 7, 2024",
      type: "Op-ed"
    },
    {
      title: "NZ Budget 2024: 'tax relief' for the 'squeezed middle'",
      outlet: "The Conversation",
      date: "May 30, 2024",
      type: "Analysis"
    },
    {
      title: "How to end the wasteful boom-bust cycle driving NZ's infrastructure gap",
      outlet: "The Conversation",
      date: "May 23, 2024",
      type: "Analysis"
    },
    {
      title: "Transport planning has gone off the rails",
      outlet: "NewsRoom",
      date: "April 19, 2024",
      type: "Op-ed"
    },
    {
      title: "Convenience never trumps the lives of children",
      outlet: "NewsRoom",
      date: "March 19, 2024",
      type: "Op-ed"
    },
    {
      title: "There is a road to zero, but you have to actually try",
      outlet: "NewsRoom",
      date: "March 7, 2024",
      type: "Op-ed"
    }
  ];

  const categories = ["All", "Dashboard", "Visualization", "Tool", "Research"];
  const filteredProjects = activeTab === "All" ? projects : projects.filter((p) => p.category === activeTab);

  return (
    <div className="bg-white text-black">
      <div className="sticky top-0 z-10 bg-gradient-to-br from-sky-50 via-blue-100 to-white border-b p-4 flex flex-col md:flex-row justify-between items-center bg-cover bg-center" style={{ backgroundImage: 'url(https://assets.tfwelch.com/images/header-background.jpg)' }}>
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold drop-shadow">Timothy F. Welch</h1>
          <p className="text-sm text-gray-500">Urban planning, transport analytics, and data storytelling</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Dialog open={showAbout} onOpenChange={setShowAbout}>
            <DialogTrigger asChild>
              <Button>About Me</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogTitle>About Timothy F. Welch</DialogTitle>
              <div className="flex flex-col md:flex-row gap-6 mt-4">
                <div className="md:w-1/3">
                  <img 
                    src="https://assets.tfwelch.com/images/profile-photo.jpg" 
                    alt="Timothy F. Welch" 
                    className="rounded-lg shadow-md w-full"
                    onError={(e) => e.currentTarget.style.display = 'none'} // Hide if image doesn't exist
                  />
                </div>
                <div className="md:w-2/3">
                  <p className="mb-4">
                    I am a Senior Lecturer in Urban Planning at the University of Auckland. My work focuses on transportation planning, urban analytics, and sustainable infrastructure development.
                  </p>
                  <p className="mb-4">
                    With a background spanning urban planning, law, and transportation policy, my research examines the intersection of mobility, urban form, and climate resilience. I'm particularly interested in developing data-driven solutions for the first/last mile problem and creating more equitable, accessible transportation systems.
                  </p>
                  <p className="mb-4">
                    Prior to joining the University of Auckland, I was an Assistant Professor at Georgia Tech's School of City and Regional Planning and Assistant Director of the Center for Quality Growth and Regional Development. I hold a PhD in Urban and Regional Planning from the University of Maryland, along with JD and LLB degrees.
                  </p>
                  <p>
                    Beyond my academic work, I actively engage in public discourse through media appearances and opinion pieces, advocating for evidence-based urban planning policies that create more sustainable, livable cities.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <a href="#projects">
            <Button variant="outline">Projects</Button>
          </a>
          <a href="#media">
            <Button variant="outline">Media</Button>
          </a>
          <a href="#publications">
            <Button variant="outline">Publications</Button>
          </a>
        </div>
      </div>

      <div id="projects" className="p-4 pt-8">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        <div className="mb-4 flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <Button key={cat} variant={cat === activeTab ? "default" : "outline"} onClick={() => setActiveTab(cat)}>
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {filteredProjects.map((project, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Card className="transition-all hover:scale-[1.01] hover:shadow-lg cursor-pointer h-full">
                  <CardContent className="p-4">
                    {project.type === "image" && <img loading="lazy" src={project.src} alt={project.title} className="w-full h-40 object-cover rounded-xl" />}
                    {project.type === "iframe" && (
                      <iframe loading="lazy" src={project.src} width="100%" height="160" frameBorder="0" scrolling="no" className="rounded-xl"></iframe>
                    )}
                    {project.type === "video" && (
                      <video controls loading="lazy" className="w-full h-40 object-cover rounded-xl">
                        <source src={project.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    <h2 className="text-lg font-semibold mt-2">{project.title}</h2>
                    <p className="mt-1 text-xs text-gray-600 line-clamp-2">{project.description}</p>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="mt-2">Explore</Button>
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

      <div id="media" className="p-4 mt-10 bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Media & Appearances</h2>
        
        <h3 className="text-xl font-semibold mb-3">Featured Video Appearances</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {mediaAppearances.filter(item => item.featured).map((item, index) => {
            const videoId = item.link ? getYouTubeVideoId(item.link) : null;
            const thumbnailUrl = videoId ? getYouTubeThumbnailUrl(videoId) : null;
            
            return (
              <Card key={index} className="hover:shadow-md transition-all">
                <CardContent className="p-4">
                  {thumbnailUrl && (
                    <div className="mb-3 relative group overflow-hidden rounded-lg">
                      <img 
                        src={thumbnailUrl} 
                        alt={item.title} 
                        className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0" aria-label={`Watch ${item.title}`}></a>
                      </div>
                    </div>
                  )}
                  <h3 className="font-semibold text-sm line-clamp-2">{item.title}</h3>
                  <p className="text-xs text-gray-600">{item.outlet} • {item.date}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <h3 className="text-xl font-semibold mb-3">Recent Articles & Op-Eds</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {mediaAppearances.filter(item => item.type === "article").concat(recentOpEds).slice(0, 6).map((item, index) => (
            <Card key={index} className="hover:shadow-md transition-all">
              <CardContent className="p-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.outlet} • {item.date}</p>
                <p className="text-sm mt-2">{item.description || item.type}</p>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="mt-3">Read More</Button>
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-6">
          <a href="https://theconversation.com/profiles/timothy-welch-1252494/articles" target="_blank" rel="noopener noreferrer">
            <Button variant="outline">View More Articles</Button>
          </a>
        </div>
      </div>

      <div id="publications" className="p-4 mt-10">
        <h2 className="text-2xl font-bold mb-4">Publications</h2>
        {zoteroItems.length === 0 ? (
          <p>Loading publications from Zotero…</p>
        ) : (
          <ul className="list-disc pl-5 space-y-3">
            {zoteroItems.slice(0, 10).map((item) => (
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
            rel="noopener noreferrer"
          >
            Google Scholar
          </a>.
        </p>
      </div>

      <footer className="p-4 mt-10 border-t text-center text-sm text-gray-500">
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