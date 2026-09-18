import React, { useEffect, useRef, useState } from "react";

import {
  Home,
  User,
  Layers,
  FolderKanban,
  Briefcase,
  GraduationCap,
  Award,
  ListChecks,
  Trophy,
  FileText,
  MessageSquare,
  Search,
  Sun,
  Moon,
  Eye,
  ChevronDown,
  Mail,
  Phone,
  Download,
  MapPin,
  CircleDot,
  CheckCircle2,
  ExternalLink,
  QrCode,
  Share2,
  Star,
  Rocket,
  CalendarDays,
  Code2,
  Database,
  Sparkles,
  BookOpen,
  Zap,
  Send,
  Quote,
  Users,
  PlayCircle,
  ShieldCheck,
  LogIn,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
} from "lucide-react";

import "./index.css";

// =====================================================
// BACKEND
// =====================================================

const API_BASE_URL = "https://manikdev-backend.onrender.com/api";

// =====================================================
// DEFAULT LINKS
// =====================================================

const DEFAULT_GITHUB =
  "https://github.com/ManikPhad5";

const DEFAULT_LINKEDIN =
  "https://linkedin.com/in/manik-phad-0320152a7";

const DEFAULT_EMAIL =
  "manikphad5@gmail.com";

const DEFAULT_PHONE =
  "9699907819";

// Default profile photo (your current Google Drive photo)
const DEFAULT_PROFILE_IMAGE =
  "https://drive.google.com/thumbnail?id=1bOpM-LjimopJz3gphTdekwFA2pifJaEY&sz=w1000";

const PROFILE_IMAGE_STORAGE_KEY = "manikdev_profile_image";

function normalizeProfileImageUrl(value) {
  const raw = String(value || "").trim();

  if (!raw) return DEFAULT_PROFILE_IMAGE;
  if (raw.startsWith("data:image/")) return raw;

  // Convert normal Google Drive share/view URLs into an image URL.
  if (raw.includes("drive.google.com")) {
    const match = raw.match(/(?:id=|\/d\/)([A-Za-z0-9_-]{20,})/);
    if (match) {
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
    }
  }

  return raw;
}

const DEFAULT_RESUME =
  "https://docs.google.com/document/d/1huj37Ax7Qy5opTyQ2-2wRmqforaiupE0/edit?usp=drivesdk&ouid=116660152528323200273&rtpof=true&sd=true";

// =====================================================
// NAVIGATION
// =====================================================

const NAV_ITEMS = [
  {
    label: "Home",
    id: "home",
    icon: Home,
  },
  {
    label: "About Me",
    id: "about",
    icon: User,
  },
  {
    label: "Skills",
    id: "skills",
    icon: Layers,
  },
  {
    label: "Projects",
    id: "projects",
    icon: FolderKanban,
  },
  {
    label: "Experience",
    id: "experience",
    icon: Briefcase,
  },
  {
    label: "Education",
    id: "education",
    icon: GraduationCap,
  },
  {
    label: "Certificates",
    id: "certificates",
    icon: Award,
  },
  {
    label: "DSA & Practice",
    id: "dsa",
    icon: ListChecks,
  },
  {
    label: "Achievements",
    id: "achievements",
    icon: Trophy,
  },
  {
    label: "Recommendations",
    id: "recommendations",
    icon: Quote,
  },
  {
    label: "Resume",
    id: "resume",
    icon: FileText,
  },
  {
    label: "Contact",
    id: "contact",
    icon: MessageSquare,
  },
];

const MOBILE_NAV = [
  {
    label: "Home",
    id: "home",
    icon: Home,
  },
  {
    label: "Skills",
    id: "skills",
    icon: Layers,
  },
  {
    label: "Projects",
    id: "projects",
    icon: FolderKanban,
  },
  {
    label: "Resume",
    id: "resume",
    icon: FileText,
  },
  {
    label: "Contact",
    id: "contact",
    icon: MessageSquare,
  },
];

// =====================================================
// FALLBACK DATA
// =====================================================

const TOP_SKILLS = [
  { label: "Java", icon: Code2 },
  { label: "Spring Boot", icon: Sparkles },
  { label: "JPA", icon: Layers },
  { label: "SQL", icon: Database },
  { label: "PostgreSQL", icon: Database },
  { label: "Python", icon: Code2 },
  { label: "Machine Learning", icon: Sparkles },
  { label: "React", icon: Code2 },
  { label: "DSA", icon: ListChecks },
];

const PROJECTS = [
  {
    title: "PharmaGrid",
    description:
      "Real-time local medicine stock finder & generic matcher.",
    tags: [
      "Java",
      "Spring Boot",
      "JPA",
      "PostgreSQL",
      "React",
    ],
    featured: true,
    githubUrl:
      "https://github.com/Codingwithpiyush/PharmaGrid-Real-Time-Local-Medicine-Stock-Finder-Generic-Matcher.git",
    demoUrl:
      "https://pharmagrid.vercel.app",
    image: "/projects/pharmagrid.png",
  },
  {
    title: "Task Manager",
    description:
      "REST API based task management system with authentication.",
    tags: [
      "Java",
      "Spring Boot",
      "JPA",
      "PostgreSQL",
    ],
    githubUrl:
      "https://github.com/manikphad/task-manager",
    demoUrl: "",
    image: "/projects/task-manager.png",
  },
  {
    title: "Bank Customer Churn",
    description:
      "Machine learning project to predict customer churn using classification.",
    tags: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "Random Forest",
    ],
    githubUrl:
      "https://github.com/ManikPhad5/Predictive-Modeling-and-Risk-Scoring-for-Bank-Customer-Churn.git",
    demoUrl: "",
    image: "/projects/bank-churn.png",
  },
  {
    title: "Student Segmentation",
    description:
      "ML project for student clustering and personalized recommendations.",
    tags: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "K-Means",
    ],
    githubUrl:
      "https://github.com/ManikPhad5/Student-Segmentation-and-Personalized-Course-Recommendation-System-for-EduPro.git",
    demoUrl: "",
    image: "/projects/student-segmentation.png",
  },
];

const EXPERIENCE = [
  {
    role: "Data Science Intern",
    company:
      "Technoworld Software Pvt. Ltd.",
    period:
      "May 2025 – Jul 2025 · Remote",
    bullets: [
      "Worked on data preprocessing and model building",
      "Analyzed real-world datasets for insights",
    ],
  },
  {
    role: "Machine Learning Intern",
    company:
      "Unified Mentor Pvt. Ltd.",
    period:
      "Jan 2026 – Mar 2026 · Remote",
    bullets: [
      "Built ML models for classification problems",
      "Improved model accuracy by 12%",
    ],
  },
];

const EDUCATION = {
  degree:
    "B.Tech – Information Technology",
  school:
    "JSPM's BSIOTR, Pune",
  period: "2023 – 2027",
  cgpa: "CGPA: 8.52 / 10",
};

const CERTIFICATES = [
  {
    name: "Python & Data Science",
    issuer: "Great Learning",
    date: "Mar 2025",
    url: null,
  },
  {
    name: "Web Development",
    issuer: "Udemy",
    date: "Dec 2024",
    url: null,
  },
  {
    name: "AI / Generative AI",
    issuer: "Coursera",
    date: "Nov 2024",
    url: null,
  },
];

const SKILL_GROUPS = [
  {
    label: "Languages",
    items: [
      "Java",
      "Python",
      "C++",
    ],
  },
  {
    label: "Frameworks & Tools",
    items: [
      "Spring Boot",
      "Hibernate",
      "React",
      "Git",
      "Docker",
    ],
  },
  {
    label: "Databases",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
    ],
  },
  {
    label: "Other",
    items: [
      "DSA",
      "Machine Learning",
      "REST APIs",
    ],
  },
];

const WHY_ME = [
  "Strong foundation in Java & Spring Boot",
  "Hands-on project experience with real-world use cases",
  "Completed ML internship with practical exposure",
  "Actively building and learning new technologies",
];

const ACHIEVEMENTS = [
  {
    label: "ICAT Aptitude Participation",
    year: "2024",
  },
  {
    label: "Prompt Engineering (ChatGPT)",
    year: "2025",
  },
  {
    label: "AI Agents & Generative AI",
    year: "2025",
  },
  {
    label: "Web Development Certification",
    year: "2024",
  },
];

const CAREER_JOURNEY = [
  {
    label: "10th",
    value: "83.40%",
  },
  {
    label: "12th",
    value: "70.67%",
  },
  {
    label: "Diploma",
    value: "88.24%",
  },
  {
    label: "B.Tech (IT)",
    value: "8.52 CGPA",
    current: true,
  },
];

const CURRENTLY_LEARNING = [
  "Spring Security",
  "Docker",
  "Microservices",
  "AWS",
];

// =====================================================
// ICONS
// =====================================================

function GithubIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={props.size || 16}
      height={props.size || 16}
      fill="currentColor"
      {...props}
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.15v3.18c0 .3.21.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={props.size || 16}
      height={props.size || 16}
      fill="currentColor"
      {...props}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56z" />
    </svg>
  );
}

// =====================================================
// HELPERS
// =====================================================

function makeUrl(
  url,
  fallback = "#"
) {
  if (!url) {
    return fallback;
  }

  const cleanUrl =
    String(url).trim();

  if (!cleanUrl) {
    return fallback;
  }

  if (
    cleanUrl.startsWith(
      "https://"
    ) ||
    cleanUrl.startsWith(
      "http://"
    )
  ) {
    return cleanUrl;
  }

  return `https://${cleanUrl}`;
}

function normalizeTags(tags) {
  if (Array.isArray(tags)) {
    return tags;
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeBullets(
  bullets
) {
  if (Array.isArray(bullets)) {
    return bullets;
  }

  if (typeof bullets === "string") {
    return bullets
      .split(/\r?\n|;/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeProject(
  project
) {
  const projectTitle =
    (project.title || "")
      .trim()
      .toLowerCase();

  const githubOverrides = {
    "pharmagrid":
      "https://github.com/Codingwithpiyush/PharmaGrid-Real-Time-Local-Medicine-Stock-Finder-Generic-Matcher.git",
    "bank customer churn":
      "https://github.com/ManikPhad5/Predictive-Modeling-and-Risk-Scoring-for-Bank-Customer-Churn.git",
    "student segmentation":
      "https://github.com/ManikPhad5/Student-Segmentation-and-Personalized-Course-Recommendation-System-for-EduPro.git",
  };

  return {
    ...project,
    githubUrl:
      githubOverrides[projectTitle] ||
      project.githubUrl ||
      "",
    tags: normalizeTags(
      project.tags
    ),
  };
}

function normalizeExperience(
  experience
) {
  return {
    ...experience,
    bullets: normalizeBullets(
      experience.bullets
    ),
  };
}

// =====================================================
// PANEL
// =====================================================

function Panel({
  className = "",
  children,
  id,
}) {
  return (
    <div
      id={id}
      className={`panel ${className}`}
    >
      {children}
    </div>
  );
}

function PanelHeader({
  icon: Icon,
  title,
}) {
  return (
    <div className="panel-header">
      <div className="panel-title">
        {Icon && <Icon size={16} />}
        <span>{title}</span>
      </div>
    </div>
  );
}

// =====================================================
// APP
// =====================================================

function AdminRows({ resource, items, titleKey, subtitleKey, onEdit, onDelete }) {
  return (
    <div style={{ marginTop: 16, display: "grid", gap: 8 }}>
      {(items || []).map((item) => (
        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, padding: "10px 12px", border: "1px solid var(--border)", borderRadius: 10 }}>
          <div style={{ minWidth: 0 }}><div style={{ fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis" }}>{item?.[titleKey] || "Item"}</div><div style={{ fontSize: 11, color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis" }}>{item?.[subtitleKey] || ""}</div></div>
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}><button className="icon-btn" type="button" onClick={() => onEdit(resource, item)} title="Edit"><Pencil size={14} /></button><button className="icon-btn" type="button" onClick={() => onDelete(resource, item.id)} title="Delete"><Trash2 size={14} /></button></div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [query, setQuery] =
    useState("");

  const [
    recruiterView,
    setRecruiterView,
  ] = useState(false);

  const [
    profile,
    setProfile,
  ] = useState(null);

  const [
    dashboard,
    setDashboard,
  ] = useState(null);

  const [skills, setSkills] =
    useState([]);

  const [
    projects,
    setProjects,
  ] = useState([]);

  const [
    experiences,
    setExperiences,
  ] = useState([]);

  const [
    education,
    setEducation,
  ] = useState(null);

  const [
    certificates,
    setCertificates,
  ] = useState(CERTIFICATES);

  const [
    achievements,
    setAchievements,
  ] = useState([]);

  const [
    learning,
    setLearning,
  ] = useState([]);

  // ===================================================
  // ADMIN
  // ===================================================

  const [adminToken, setAdminToken] = useState(() =>
    localStorage.getItem("manikdev_admin_token") || ""
  );
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminLogin, setAdminLogin] = useState({ username: "admin", password: "admin123" });
  const [adminError, setAdminError] = useState("");
  const [adminMessage, setAdminMessage] = useState("");
  const [adminTab, setAdminTab] = useState("skills");
  const [adminEditingId, setAdminEditingId] = useState(null);
  const [adminSaving, setAdminSaving] = useState(false);
  const [showProfileImageModal, setShowProfileImageModal] = useState(false);
  const [profileImageModalSrc, setProfileImageModalSrc] = useState("");

  function openProfileImage(imageUrl) {
    setProfileImageModalSrc(normalizeProfileImageUrl(imageUrl || profileImageUrl || DEFAULT_PROFILE_IMAGE));
    setShowProfileImageModal(true);
  }

  function closeProfileImage() {
    setShowProfileImageModal(false);
  }
  const emptyAdminForms = {
    profile: { id: null, name: "", title: "", email: "", phone: "", location: "", about: "", githubUrl: DEFAULT_GITHUB, linkedinUrl: DEFAULT_LINKEDIN, resumeUrl: DEFAULT_RESUME, profileImageUrl: DEFAULT_PROFILE_IMAGE, openToOpportunities: true, dsaProblems: 150 },
    skills: { name: "", category: "" },
    projects: { title: "", description: "", tags: "", featured: false, githubUrl: "", demoUrl: "", image: "" },
    experience: { role: "", company: "", period: "", bullets: "" },
    education: { degree: "", school: "", period: "", cgpa: "" },
    certificates: { name: "", issuer: "", date: "", url: "" },
    achievements: { label: "", year: "" },
    learning: { title: "", description: "", status: "" },
  };
  const [adminForms, setAdminForms] = useState(emptyAdminForms);

  // ===================================================
  // RECOMMENDATIONS
  // ===================================================

  const [
    recommendations,
    setRecommendations,
  ] = useState([]);

  const [
    recommendationForm,
    setRecommendationForm,
  ] = useState({
    name: "",
    role: "",
    quote: "",
  });

  const [
    recommendationSent,
    setRecommendationSent,
  ] = useState(false);

  const [
    recommendationError,
    setRecommendationError,
  ] = useState("");

  // ===================================================
  // RECOMMENDATIONS
  // ===================================================

  function adminHeaders(includeJson = true) {
    const headers = {};
    if (includeJson) headers["Content-Type"] = "application/json";
    if (adminToken) headers.Authorization = `Bearer ${adminToken}`;
    return headers;
  }

  function resetAdminForm(resource = adminTab) {
    setAdminEditingId(null);
    setAdminForms((current) => ({ ...current, [resource]: { ...emptyAdminForms[resource] } }));
  }

  function setAdminForm(resource, key, value) {
    setAdminForms((current) => ({ ...current, [resource]: { ...current[resource], [key]: value } }));
  }

  function editAdminItem(resource, item) {
    setAdminEditingId(item?.id ?? null);
    setAdminForms((current) => ({
      ...current,
      [resource]: {
        ...emptyAdminForms[resource],
        ...item,
        tags: Array.isArray(item?.tags) ? item.tags.join(", ") : (item?.tags || ""),
        bullets: Array.isArray(item?.bullets) ? item.bullets.join("\n") : (item?.bullets || ""),
      },
    }));
  }

  function adminResourceData(resource) {
    return { skills, projects, experience: experiences, education: education ? [education] : [], certificates, achievements, learning }[resource] || [];
  }

  async function handleAdminLogin(e) {
    e.preventDefault();
    setAdminError("");
    setAdminMessage("");

    const username = String(adminLogin.username || "").trim();
    const password = String(adminLogin.password || "").trim();

    if (!username || !password) {
      setAdminError("Username and password are required.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const rawText = await response.text();

      let data = {};
      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch {
        data = { message: rawText };
      }

      if (!response.ok) {
        throw new Error(
          data.message ||
          data.error ||
          rawText ||
          `Login failed with status ${response.status}`
        );
      }

      const token = data.token || data.accessToken || data.jwt;

      if (!token) {
        throw new Error(
          "Login succeeded, but JWT token was not returned by backend."
        );
      }

      localStorage.setItem("manikdev_admin_token", token);
      setAdminToken(token);
      setAdminLogin({ username: "admin", password: "admin123" });
      setShowAdminLogin(false);
      setShowAdmin(true);
      setAdminMessage("Admin login successful");

    } catch (error) {
      console.error("ADMIN LOGIN ERROR:", error);
      setAdminError(error.message || "Admin login failed");
    }
  }

  function adminLogout() {
    localStorage.removeItem("manikdev_admin_token");
    setAdminToken("");
    setShowAdmin(false);
    setShowAdminLogin(false);
    setAdminMessage("Logged out");
  }

  function adminPayload(resource) {
    const f = adminForms[resource];
    if (resource === "profile") {
      const { id, ...payload } = f;
      return payload;
    }
    if (resource === "skills") return { name: f.name.trim(), category: f.category.trim() };
    if (resource === "projects") return { title: f.title.trim(), description: f.description.trim(), tags: f.tags.split(",").map(v => v.trim()).filter(Boolean).join(","), featured: !!f.featured, githubUrl: f.githubUrl.trim(), demoUrl: f.demoUrl.trim(), image: f.image.trim() };
    if (resource === "experience") return { role: f.role.trim(), company: f.company.trim(), period: f.period.trim(), bullets: f.bullets.split(/\n|,/).map(v => v.trim()).filter(Boolean).join("\n") };
    if (resource === "education") return { degree: f.degree.trim(), school: f.school.trim(), period: f.period.trim(), cgpa: f.cgpa.trim() };
    if (resource === "certificates") return { name: f.name.trim(), issuer: f.issuer.trim(), date: f.date.trim(), url: f.url.trim() };
    if (resource === "achievements") return { label: f.label.trim(), year: f.year };
    if (resource === "learning") return { title: f.title.trim(), description: f.description.trim(), status: f.status.trim() };
    return f;
  }

  async function saveAdminResource(resource) {
    setAdminError("");
    setAdminMessage("");
    setAdminSaving(true);
    try {
      const isEdit = adminEditingId !== null;
      const path = `${API_BASE_URL}/${resource}${isEdit ? `/${adminEditingId}` : ""}`;
      const response = await fetch(path, { method: isEdit ? "PUT" : "POST", headers: adminHeaders(true), body: JSON.stringify(adminPayload(resource)) });
      const text = await response.text();
      if (!response.ok) throw new Error(text || `Request failed: ${response.status}`);
      resetAdminForm(resource);
      const reload = { skills: loadSkills, projects: loadProjects, experience: loadExperience, education: loadEducation, certificates: loadCertificates, achievements: loadAchievements, learning: loadLearning }[resource];
      if (reload) await reload();
      await loadDashboard();
      setAdminMessage(`${resource} ${isEdit ? "updated" : "added"} successfully`);
    } catch (error) {
      setAdminError(String(error.message).includes("401") || String(error.message).includes("403") ? "Admin session expired or access denied. Please login again." : (error.message || "Could not save data"));
    } finally {
      setAdminSaving(false);
    }
  }

  async function deleteAdminResource(resource, id) {
    if (!window.confirm(`Delete this ${resource} item?`)) return;
    setAdminError("");
    setAdminMessage("");
    try {
      const response = await fetch(`${API_BASE_URL}/${resource}/${id}`, { method: "DELETE", headers: adminHeaders(false) });
      const text = await response.text();
      if (!response.ok) throw new Error(text || `Delete failed: ${response.status}`);
      const reload = { skills: loadSkills, projects: loadProjects, experience: loadExperience, education: loadEducation, certificates: loadCertificates, achievements: loadAchievements, learning: loadLearning }[resource];
      if (reload) await reload();
      await loadDashboard();
      setAdminMessage(`${resource} deleted successfully`);
    } catch (error) {
      setAdminError(error.message || "Could not delete item");
    }
  }

  function openAdmin() {
    if (adminToken) setShowAdmin(true); else setShowAdminLogin(true);
  }

  async function loadRecommendations() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/recommendations`
      );

      if (!response.ok) {
        throw new Error(
          `Recommendations API Error: ${response.status}`
        );
      }

      const data =
        await response.json();

      setRecommendations(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Recommendations API Error:",
        error
      );
    }
  }

  async function handleRecommendationSubmit(
    e
  ) {
    e.preventDefault();

    setRecommendationError("");
    setRecommendationSent(false);

    const payload = {
      name:
        recommendationForm.name.trim(),
      role:
        recommendationForm.role.trim(),
      quote:
        recommendationForm.quote.trim(),
    };

    try {
      const response = await fetch(
        `${API_BASE_URL}/recommendations`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText =
          await response.text();

        throw new Error(
          `Recommendation API Error: ${response.status} ${errorText}`
        );
      }

      const newRecommendation =
        await response.json();

      setRecommendations(
        (current) => [
          newRecommendation,
          ...current,
        ]
      );

      setRecommendationForm({
        name: "",
        role: "",
        quote: "",
      });

      setRecommendationSent(true);

      setTimeout(() => {
        setRecommendationSent(false);
      }, 3000);
    } catch (error) {
      console.error(
        "Recommendation Error:",
        error
      );

      setRecommendationError(
        "Recommendation could not be submitted. Please try again."
      );
    }
  }

  // ===================================================
  // CONTACT
  // ===================================================

  const [
    contactForm,
    setContactForm,
  ] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [
    contactSent,
    setContactSent,
  ] = useState(false);

  const [
    contactError,
    setContactError,
  ] = useState("");

  // ===================================================
  // VIEW COUNT
  // ===================================================

  const [
    viewCount,
    setViewCount,
  ] = useState(null);

  const viewCountedRef =
    useRef(false);

  const recommendationsRef =
    useRef(null);

  // ===================================================
  // NAVIGATION
  // ===================================================

  function scrollToSection(
    sectionId
  ) {
    if (sectionId === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    if (sectionId === "recommendations") {
      recommendationsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    const element =
      document.getElementById(
        sectionId
      );

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  // ===================================================
  // LOAD ALL
  // ===================================================

  useEffect(() => {
    loadProfile();
    loadDashboard();
    loadSkills();
    loadProjects();
    loadExperience();
    loadEducation();
    loadCertificates();
    loadAchievements();
    loadLearning();
    loadRecommendations();

    if (
      !viewCountedRef.current
    ) {
      viewCountedRef.current = true;
      increaseProfileView();
    }
  }, []);

  // ===================================================
  // PROFILE
  // ===================================================

  async function loadProfile() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/profile`
      );

      if (!response.ok) {
        throw new Error(
          `Profile API Error: ${response.status}`
        );
      }

      const data =
        await response.json();

      setProfile(data);
      setAdminForms((current) => ({
        ...current,
        profile: {
          ...emptyAdminForms.profile,
          ...data,
          profileImageUrl: normalizeProfileImageUrl(
            localStorage.getItem(PROFILE_IMAGE_STORAGE_KEY) ||
            data.profileImageUrl ||
            DEFAULT_PROFILE_IMAGE
          ),
        },
      }));

      if (
        data.profileViews !==
          undefined &&
        data.profileViews !== null
      ) {
        setViewCount(
          data.profileViews
        );
      }
    } catch (error) {
      console.error(
        "Profile API Error:",
        error
      );
    }
  }

  // ===================================================
  // DASHBOARD
  // ===================================================

  async function loadDashboard() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/dashboard/summary`
      );

      if (!response.ok) {
        throw new Error(
          `Dashboard API Error: ${response.status}`
        );
      }

      const data =
        await response.json();

      setDashboard(data);
    } catch (error) {
      console.error(
        "Dashboard API Error:",
        error
      );
    }
  }

  // ===================================================
  // PROFILE VIEW
  // ===================================================

  async function increaseProfileView() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/profile/view`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error(
          `View API Error: ${response.status}`
        );
      }

      await loadProfile();
      await loadDashboard();
    } catch (error) {
      console.error(
        "Profile View Error:",
        error
      );
    }
  }

  // ===================================================
  // SKILLS
  // ===================================================

  async function loadSkills() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/skills`
      );

      if (!response.ok) {
        throw new Error(
          `Skills API Error: ${response.status}`
        );
      }

      const data =
        await response.json();

      setSkills(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Skills API Error:",
        error
      );
    }
  }

  // ===================================================
  // PROJECTS
  // ===================================================

  async function loadProjects() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/projects`
      );

      if (!response.ok) {
        throw new Error(
          `Projects API Error: ${response.status}`
        );
      }

      const data =
        await response.json();

      setProjects(
        Array.isArray(data)
          ? data.map(
              normalizeProject
            )
          : []
      );
    } catch (error) {
      console.error(
        "Projects API Error:",
        error
      );
    }
  }

  // ===================================================
  // EXPERIENCE
  // ===================================================

  async function loadExperience() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/experience`
      );

      if (!response.ok) {
        throw new Error(
          `Experience API Error: ${response.status}`
        );
      }

      const data =
        await response.json();

      setExperiences(
        Array.isArray(data)
          ? data.map(
              normalizeExperience
            )
          : []
      );
    } catch (error) {
      console.error(
        "Experience API Error:",
        error
      );
    }
  }

  // ===================================================
  // EDUCATION
  // ===================================================

  async function loadEducation() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/education`
      );

      if (!response.ok) {
        throw new Error(
          `Education API Error: ${response.status}`
        );
      }

      const data =
        await response.json();

      if (Array.isArray(data)) {
        setEducation(
          data.length > 0
            ? data[0]
            : null
        );
      } else {
        setEducation(data);
      }
    } catch (error) {
      console.error(
        "Education API Error:",
        error
      );
    }
  }

  // ===================================================
  // CERTIFICATES
  // ===================================================

  async function loadCertificates() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/certificates`
      );

      if (!response.ok) {
        throw new Error(
          `Certificates API Error: ${response.status}`
        );
      }

      const data =
        await response.json();

      if (
        Array.isArray(data) &&
        data.length > 0
      ) {
        setCertificates(data);
      }
    } catch (error) {
      console.error(
        "Certificates API Error:",
        error
      );
    }
  }

  // ===================================================
  // ACHIEVEMENTS
  // ===================================================

  async function loadAchievements() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/achievements`
      );

      if (!response.ok) {
        throw new Error(
          `Achievements API Error: ${response.status}`
        );
      }

      const data =
        await response.json();

      setAchievements(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Achievements API Error:",
        error
      );
    }
  }

  // ===================================================
  // LEARNING
  // ===================================================

  async function loadLearning() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/learning`
      );

      if (!response.ok) {
        throw new Error(
          `Learning API Error: ${response.status}`
        );
      }

      const data =
        await response.json();

      setLearning(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Learning API Error:",
        error
      );
    }
  }

  // ===================================================
  // CONTACT
  // ===================================================

  async function handleContactSubmit(
    e
  ) {
    e.preventDefault();

    setContactError("");
    setContactSent(false);

    try {
      const response = await fetch(
        `${API_BASE_URL}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name:
              contactForm.name.trim(),
            email:
              contactForm.email.trim(),
            message:
              contactForm.message.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Contact API Error: ${response.status}`
        );
      }

      // clear form
      setContactForm({
        name: "",
        email: "",
        message: "",
      });

      // success message
      setContactSent(true);

      // hide after 3 seconds
      setTimeout(() => {
        setContactSent(false);
      }, 3000);
    } catch (error) {
      console.error(
        "Contact API Error:",
        error
      );

      setContactError(
        "Message could not be sent. Please try again."
      );
    }
  }

  // ===================================================
  // PRINT
  // ===================================================

  async function handleProfileImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setAdminError("Please select an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setAdminError("Please choose an image smaller than 10 MB.");
      event.target.value = "";
      return;
    }

    try {
      // Compress the image so it behaves more like a WhatsApp-style DP
      // and is small enough to send with the profile update request.
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            const maxSize = 700;
            const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
            const canvas = document.createElement("canvas");
            canvas.width = Math.max(1, Math.round(img.width * scale));
            canvas.height = Math.max(1, Math.round(img.height * scale));

            const ctx = canvas.getContext("2d");
            if (!ctx) {
              reject(new Error("Canvas is not supported."));
              return;
            }

            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            resolve(canvas.toDataURL("image/jpeg", 0.82));
          };
          img.onerror = () => reject(new Error("Could not load image."));
          img.src = reader.result;
        };
        reader.onerror = () => reject(new Error("Could not read image."));
        reader.readAsDataURL(file);
      });

      // Save an immediate device-side copy. This means the new DP remains
      // visible even before a backend update succeeds.
      localStorage.setItem(PROFILE_IMAGE_STORAGE_KEY, dataUrl);
      setAdminForm("profile", "profileImageUrl", dataUrl);
      setProfileImageModalSrc(dataUrl);
      setAdminError("");
      setAdminMessage("New photo selected. Click Update Profile to save it.");
    } catch (error) {
      console.error("Profile photo error:", error);
      setAdminError("Could not process the selected photo.");
    } finally {
      event.target.value = "";
    }
  }

  function handlePrint() {
    window.print();
  }

  // ===================================================
  // PROFILE DATA
  // ===================================================

  const profileName =
    profile?.name ||
    "Manik Phad";

  const profileTitle =
    profile?.title ||
    "Java Backend Developer";

  const profileLocation =
    profile?.location ||
    "Pune, Maharashtra, India";

  const profileAbout =
    profile?.about ||
    "Passionate about building scalable backend systems and solving real-world problems through technology. Experienced in Java, Spring Boot, and ML, with a strong foundation in DSA.";

  const profileEmail =
    profile?.email ||
    DEFAULT_EMAIL;

  const profilePhone =
    profile?.phone ||
    DEFAULT_PHONE;

  const githubUrl = makeUrl(
    profile?.githubUrl,
    DEFAULT_GITHUB
  );

  const linkedinUrl = makeUrl(
    profile?.linkedinUrl,
    DEFAULT_LINKEDIN
  );

  const resumeUrl =
    profile?.resumeUrl ||
    DEFAULT_RESUME;

  const savedDeviceProfileImage =
    localStorage.getItem(PROFILE_IMAGE_STORAGE_KEY) ||
    "";

  const profileImageUrl =
    normalizeProfileImageUrl(
      savedDeviceProfileImage ||
      profile?.profileImageUrl ||
      DEFAULT_PROFILE_IMAGE
    );

  // ===================================================
  // DISPLAY DATA
  // ===================================================

  const displaySkills =
    skills.length > 0
      ? skills.map((skill) => ({
          label:
            skill.name ||
            "Skill",

          icon:
            skill.category
              ?.toLowerCase()
              .includes("database")
              ? Database
              : skill.name
                  ?.toLowerCase()
                  .includes("spring")
              ? Sparkles
              : skill.name
                  ?.toLowerCase()
                  .includes("dsa")
              ? ListChecks
              : Code2,
        }))
      : TOP_SKILLS;

  const displayProjects =
    projects.length > 0
      ? projects
      : PROJECTS;

  const displayExperience =
    experiences.length > 0
      ? experiences
      : EXPERIENCE;

  const displayEducation =
    education ||
    EDUCATION;

  const displayAchievements =
    achievements.length > 0
      ? achievements
      : ACHIEVEMENTS;

  const displayLearning =
    learning.length > 0
      ? learning
      : CURRENTLY_LEARNING;

  const displayCertificates =
    certificates.length > 0
      ? certificates
      : CERTIFICATES;

  // ===================================================
  // SEARCH
  // ===================================================

  const queryText =
    query.trim().toLowerCase();

  const filteredSkills =
    queryText
      ? displaySkills.filter(
          (skill) =>
            skill.label
              ?.toLowerCase()
              .includes(
                queryText
              )
        )
      : displaySkills;

  const filteredProjects =
    queryText
      ? displayProjects.filter(
          (project) => {
            const tags =
              normalizeTags(
                project.tags
              );

            return (
              project.title
                ?.toLowerCase()
                .includes(
                  queryText
                ) ||
              project.description
                ?.toLowerCase()
                .includes(
                  queryText
                ) ||
              tags.some((tag) =>
                tag
                  .toLowerCase()
                  .includes(
                    queryText
                  )
              )
            );
          }
        )
      : displayProjects;

  // ===================================================
  // OVERVIEW
  // ===================================================

  const overviewData = [
    {
      label: "Skills",
      value: dashboard
        ? `${dashboard.skills}+`
        : "12+",
      icon: Layers,
    },
    {
      label: "Projects",
      value: dashboard
        ? dashboard.projects
        : 4,
      icon: FolderKanban,
    },
    {
      label: "Experience",
      value: dashboard
        ? `${dashboard.experience} Internships`
        : "2 Internships",
      icon: Briefcase,
    },
    {
      label: "Certificates",
      value: dashboard
        ? dashboard.certificates
        : 5,
      icon: Award,
    },
    {
      label: "DSA Problems",
      value: dashboard
        ? `${dashboard.dsaProblems}+`
        : "150+",
      icon: ListChecks,
    },
  ];

  // ===================================================
  // EDUCATION
  // ===================================================

  const educationDegree =
    displayEducation?.degree ||
    EDUCATION.degree;

  const educationSchool =
    displayEducation?.school ||
    EDUCATION.school;

  const educationPeriod =
    displayEducation?.period ||
    EDUCATION.period;

  const educationCgpa =
    displayEducation?.cgpa ||
    EDUCATION.cgpa;

  // ===================================================
  // UI
  // ===================================================

  return (
    <>
      <div
        className="bg-decor"
        aria-hidden="true"
      />

      <div
        className={
          "app-shell" +
          (recruiterView
            ? " recruiter-mode"
            : "")
        }
      >

        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside className="sidebar">

          <div className="sidebar-brand">

            <div className="brand-mark">
              <Code2 size={17} />
            </div>

            <div>
              <div className="brand-name">
                Manik<span>.dev</span>
              </div>

              <div className="brand-tag">
                Your complete developer
                identity
              </div>
            </div>

          </div>

          <nav className="nav">

            {NAV_ITEMS.map(
              ({
                label,
                id,
                icon: Icon,
              }) => (
                <button
                  key={id}
                  type="button"
                  className="nav-item"
                  onClick={() =>
                    scrollToSection(
                      id
                    )
                  }
                >
                  <Icon size={17} />
                  {label}
                </button>
              )
            )}

          </nav>

          <div className="sidebar-footer">

            Build the skills today,
            create the opportunities
            tomorrow.

            <strong>
              — Manik Phad
            </strong>

          </div>

        </aside>

        {/* =================================================
            MAIN
        ================================================= */}

        <div className="main">

          {/* TOPBAR */}

          <header className="topbar">

            <div className="search-box">

              <Search size={15} />

              <input
                value={query}
                onChange={(e) =>
                  setQuery(
                    e.target.value
                  )
                }
                placeholder="Search skills, projects, experience, or anything..."
              />

            </div>

            <button
              type="button"
              className={
                "recruiter-btn" +
                (recruiterView
                  ? " on"
                  : "")
              }
              onClick={() =>
                setRecruiterView(
                  (value) =>
                    !value
                )
              }
            >
              <Eye size={14} />

              <span>
                {recruiterView
                  ? "Full view"
                  : "Recruiter view"}
              </span>
            </button>

            <button
              type="button"
              className="recruiter-btn"
              onClick={openAdmin}
              style={adminToken ? { background: "rgba(34,197,94,.12)", borderColor: "rgba(34,197,94,.35)" } : undefined}
            >
              <ShieldCheck size={14} />
              <span>{adminToken ? "Admin" : "Admin Login"}</span>
            </button>

            <button
              type="button"
              className="icon-btn"
              onClick={handlePrint}
              title="Print / Export as PDF"
            >
              <FileText size={17} />
            </button>

            <button
              type="button"
              className="icon-btn"
              title="Dark mode"
            >
              <Sun size={17} />
            </button>

            <button
              type="button"
              className="icon-btn"
              title="Light mode"
            >
              <Moon size={17} />
            </button>

            <div className="topbar-user">

              <button
                type="button"
                className="avatar-sm"
                onClick={() => openProfileImage(profileImageUrl)}
                aria-label="Open profile photo"
                style={{ overflow: "hidden", padding: 0, background: "#111827", border: 0, cursor: "zoom-in" }}
              >
                <img
                  src={profileImageUrl}
                  alt="Manik Phad"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={(e) => { e.currentTarget.src = DEFAULT_PROFILE_IMAGE; }}
                />
              </button>

              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                {profileName}
              </span>

              <ChevronDown
                size={14}
                color="var(--text-muted)"
              />

            </div>

          </header>

          <div className="content">

            {/* =================================================
                CONTENT MAIN
            ================================================= */}

            <div className="content-main">

              {/* HOME */}

              <div
                id="home"
                className="top-row"
              >

                {/* PROFILE */}

                <Panel className="profile-card">

                  <button
                    type="button"
                    className="profile-avatar"
                    onClick={() => openProfileImage(profileImageUrl)}
                    aria-label="Open profile photo"
                    style={{
                      padding: 0,
                      overflow: "hidden",
                      position: "relative",
                      background: "#111827",
                      borderRadius: 22,
                      border: "0",
                      cursor: "zoom-in",
                      display: "block",
                    }}
                  >
                    <img
                      src={profileImageUrl}
                      alt="Manik Phad"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_PROFILE_IMAGE;
                      }}
                    />
                    <span className="status-dot" />
                    <span
                      style={{
                        position: "absolute",
                        right: 8,
                        bottom: 8,
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        background: "rgba(15,23,42,.82)",
                        border: "1px solid rgba(255,255,255,.15)",
                        color: "white",
                        fontSize: 14,
                        pointerEvents: "none",
                      }}
                    >
                      🔍
                    </span>
                  </button>

                  <div className="profile-body">

                    <div className="profile-name-row">

                      <h1 className="profile-name">
                        {profileName}
                      </h1>

                      <CheckCircle2
                        size={17}
                        className="profile-verify"
                      />

                    </div>

                    <p className="profile-role">
                      {profileTitle}
                    </p>

                    <div className="profile-meta">

                      <span className="profile-meta-item">
                        <MapPin
                          size={13}
                        />
                        {
                          profileLocation
                        }
                      </span>

                      <span className="profile-meta-item">
                        <GraduationCap
                          size={13}
                        />
                        B.Tech IT (2027)
                      </span>

                      {profile?.openToOpportunities !==
                        false && (
                        <span className="profile-meta-item open">
                          <CircleDot
                            size={11}
                          />
                          Open to opportunities
                        </span>
                      )}

                      {viewCount !== null && (
                        <span className="profile-meta-item">
                          <Eye size={13} />
                          {viewCount} profile view
                          {viewCount === 1
                            ? ""
                            : "s"}
                        </span>
                      )}

                    </div>

                    <p className="profile-summary">
                      {profileAbout}
                    </p>

                    <div className="profile-actions">

                      {/* GITHUB */}

                      <a
                        className="social-btn"
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <GithubIcon
                          size={15}
                        />
                      </a>

                      {/* LINKEDIN */}

                      <a
                        className="social-btn"
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <LinkedinIcon
                          size={15}
                        />
                      </a>

                      {/* EMAIL */}

                      <a
                        className="social-btn"
                        href={`mailto:${profileEmail}`}
                        aria-label="Email"
                      >
                        <Mail size={15} />
                      </a>

                      {/* PHONE */}

                      <a
                        className="social-btn"
                        href={`tel:${profilePhone}`}
                        aria-label="Phone"
                      >
                        <Phone size={15} />
                      </a>

                      {/* RESUME */}

                      <a
                        className="btn-primary"
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download size={14} />
                        View Resume
                      </a>

                    </div>

                  </div>

                </Panel>

                {/* OVERVIEW */}

                <Panel className="overview-card">

                  <div className="overview-title">
                    <Zap size={16} />
                    Quick overview
                  </div>

                  {overviewData.map(
                    ({
                      label,
                      value,
                      icon: Icon,
                    }) => (
                      <div
                        className="overview-row"
                        key={label}
                      >
                        <span className="overview-label">
                          <Icon size={13} />
                          {label}
                        </span>

                        <span className="overview-value">
                          {value}
                        </span>
                      </div>
                    )
                  )}

                </Panel>

              </div>

              {/* =================================================
                  ABOUT
              ================================================= */}

              <Panel id="about">

                <PanelHeader
                  icon={User}
                  title="About Me"
                />

                <div className="panel-body">

                  <p className="profile-summary">
                    {profileAbout}
                  </p>

                </div>

              </Panel>

              {/* =================================================
                  SKILLS
              ================================================= */}

              <div id="skills">

                <div className="pill-row">

                  {filteredSkills.length ===
                    0 && (
                    <span className="no-results">
                      No skills match
                      "{queryText}"
                    </span>
                  )}

                  {filteredSkills.map(
                    ({
                      label,
                      icon: Icon,
                    }) => (
                      <span
                        className="pill"
                        key={label}
                      >
                        <Icon size={13} />
                        {label}
                      </span>
                    )
                  )}

                </div>

                <Panel>

                  <PanelHeader
                    icon={Layers}
                    title="Technical Skills"
                  />

                  <div className="panel-body">

                    {skills.length > 0 ? (
                      <div className="skill-group">

                        <p className="skill-group-label">
                          Skills
                        </p>

                        <div className="pill-row">

                          {skills.map(
                            (skill) => (
                              <span
                                className="pill tag"
                                key={
                                  skill.id ||
                                  skill.name
                                }
                              >
                                {
                                  skill.name
                                }
                              </span>
                            )
                          )}

                        </div>

                      </div>
                    ) : (
                      SKILL_GROUPS.map(
                        (group) => (
                          <div
                            className="skill-group"
                            key={
                              group.label
                            }
                          >

                            <p className="skill-group-label">
                              {
                                group.label
                              }
                            </p>

                            <div className="pill-row">

                              {group.items.map(
                                (item) => (
                                  <span
                                    className="pill tag"
                                    key={item}
                                  >
                                    {item}
                                  </span>
                                )
                              )}

                            </div>

                          </div>
                        )
                      )
                    )}

                  </div>

                </Panel>

              </div>

              {/* =================================================
                  PROJECTS
              ================================================= */}

              <Panel id="projects">

                <PanelHeader
                  icon={FolderKanban}
                  title="Featured Projects"
                />

                <div className="panel-body">

                  {filteredProjects.length ===
                    0 && (
                    <p className="no-results">
                      No projects match
                      "{queryText}"
                    </p>
                  )}

                  <div className="project-grid">

                    {filteredProjects.map(
                      (project) => {

                        const tags =
                          normalizeTags(
                            project.tags
                          );

                        return (
                          <div
                            className="project-card"
                            key={
                              project.id ||
                              project.title
                            }
                          >

                            <div className="project-thumb">

                              {project.featured && (
                                <span className="badge-featured">
                                  Featured
                                </span>
                              )}

                              {project.image ? (
                                <img
                                  src={
                                    project.image
                                  }
                                  alt={
                                    project.title
                                  }
                                  className="project-thumb-img"
                                  onError={(
                                    e
                                  ) => {
                                    e.currentTarget.style.display =
                                      "none";

                                    if (
                                      e.currentTarget
                                        .nextSibling
                                    ) {
                                      e.currentTarget.nextSibling.style.display =
                                        "flex";
                                    }
                                  }}
                                />
                              ) : null}

                              <div
                                className="project-thumb-fallback"
                                style={{
                                  display:
                                    project.image
                                      ? "none"
                                      : "flex",
                                }}
                              >
                                <FolderKanban
                                  size={26}
                                />
                              </div>

                            </div>

                            <div className="project-body">

                              <div className="project-title-row">

                                <span className="project-title">
                                  {
                                    project.title
                                  }
                                </span>

                                <ExternalLink
                                  size={13}
                                />

                              </div>

                              <p className="project-desc">
                                {
                                  project.description
                                }
                              </p>

                              <div className="project-tags">

                                {tags.map(
                                  (tag) => (
                                    <span
                                      className="pill tag"
                                      key={tag}
                                    >
                                      {tag}
                                    </span>
                                  )
                                )}

                              </div>

                              <div className="project-links">

                                {project.githubUrl && (
                                  <a
                                    className="project-link"
                                    href={makeUrl(
                                      project.githubUrl
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <GithubIcon
                                      size={13}
                                    />
                                    GitHub
                                  </a>
                                )}

                                {project.demoUrl && (
                                  <a
                                    className="project-link"
                                    href={makeUrl(
                                      project.demoUrl
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <PlayCircle
                                      size={13}
                                    />
                                    Live demo
                                  </a>
                                )}

                              </div>

                            </div>

                          </div>
                        );
                      }
                    )}

                  </div>

                </div>

              </Panel>

              {/* =================================================
                  EXPERIENCE
              ================================================= */}

              <Panel id="experience">

                <PanelHeader
                  icon={Briefcase}
                  title="Experience"
                />

                <div className="panel-body">

                  {displayExperience.map(
                    (experience) => {

                      const bullets =
                        normalizeBullets(
                          experience.bullets
                        );

                      return (
                        <div
                          className="timeline-entry"
                          key={
                            experience.id ||
                            experience.role
                          }
                        >

                          <div className="timeline-icon">
                            <Briefcase
                              size={14}
                            />
                          </div>

                          <div>

                            <p className="timeline-role">
                              {
                                experience.role
                              }
                            </p>

                            <p className="timeline-company">
                              {
                                experience.company
                              }
                            </p>

                            <p className="timeline-period">
                              <CalendarDays
                                size={10}
                              />
                              {
                                experience.period
                              }
                            </p>

                            <ul className="timeline-bullets">

                              {bullets.map(
                                (bullet) => (
                                  <li
                                    key={bullet}
                                  >
                                    {bullet}
                                  </li>
                                )
                              )}

                            </ul>

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>

              </Panel>

              {/* =================================================
                  EDUCATION
              ================================================= */}

              <Panel id="education">

                <PanelHeader
                  icon={GraduationCap}
                  title="Education"
                />

                <div className="panel-body simple-row">

                  <div className="timeline-icon">
                    <GraduationCap
                      size={14}
                    />
                  </div>

                  <div>

                    <p className="timeline-role">
                      {educationDegree}
                    </p>

                    <p className="timeline-company">
                      {educationSchool}
                    </p>

                    <p
                      className="timeline-period"
                      style={{
                        marginBottom: 0,
                      }}
                    >
                      {educationPeriod}
                      {" · "}
                      {educationCgpa}
                    </p>

                  </div>

                </div>

              </Panel>

              {/* =================================================
                  CERTIFICATES
              ================================================= */}

              <Panel id="certificates">

                <PanelHeader
                  icon={Award}
                  title="Certifications"
                />

                <div className="panel-body">

                  {displayCertificates.map(
                    (certificate) => (
                      <div
                        className="cert-row"
                        key={
                          certificate.id ||
                          `${certificate.name}-${certificate.date}`
                        }
                      >

                        <div className="cert-left">

                          <Award size={13} />

                          <div>

                            <p className="cert-name">
                              {
                                certificate.name
                              }
                            </p>

                            <p className="cert-issuer">
                              {
                                certificate.issuer
                              }
                            </p>

                            {certificate.url && (
                              <a
                                className="cert-view-link"
                                href={makeUrl(
                                  certificate.url
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Eye
                                  size={11}
                                />
                                View certificate
                              </a>
                            )}

                          </div>

                        </div>

                        <span className="cert-date">
                          {
                            certificate.date
                          }
                        </span>

                      </div>
                    )
                  )}

                </div>

              </Panel>

              {/* =================================================
                  DSA
              ================================================= */}

              <Panel id="dsa">

                <PanelHeader
                  icon={ListChecks}
                  title="DSA & Practice"
                />

                <div className="panel-body">

                  <div className="overview-row">

                    <span className="overview-label">
                      <ListChecks
                        size={13}
                      />
                      Problems solved
                    </span>

                    <span className="overview-value">
                      {dashboard
                        ? `${dashboard.dsaProblems}+`
                        : "150+"}
                    </span>

                  </div>

                  <p className="profile-summary">
                    Regularly practicing Java
                    DSA problems covering arrays,
                    strings, stacks, queues,
                    linked lists and placement
                    patterns.
                  </p>

                </div>

              </Panel>

              {/* =================================================
                  ACHIEVEMENTS
              ================================================= */}

              <Panel id="achievements">

                <PanelHeader
                  icon={Trophy}
                  title="My Achievements"
                />

                <div className="panel-body">

                  {displayAchievements.map(
                    (achievement) => (
                      <div
                        className="achievement-row"
                        key={
                          achievement.id ||
                          achievement.label
                        }
                      >

                        <span className="achievement-label">

                          <Trophy
                            size={13}
                          />

                          {
                            achievement.label
                          }

                        </span>

                        <span className="achievement-year">
                          {
                            achievement.year
                          }
                        </span>

                      </div>
                    )
                  )}

                </div>

              </Panel>

              {/* =================================================
                  RECOMMENDATIONS
              ================================================= */}

              <div
                ref={recommendationsRef}
                id="recommendations"
              >
                <Panel>
                  <PanelHeader
                    icon={Quote}
                    title="Recommendations"
                  />

                  <div className="panel-body">

                    {recommendationSent && (
                      <p
                        className="contact-sent"
                        style={{
                          marginBottom: 14,
                        }}
                      >
                        Recommendation submitted successfully. 🎉
                      </p>
                    )}

                    {recommendationError && (
                      <p
                        style={{
                          color: "#ef4444",
                          marginBottom: 14,
                          fontSize: 13,
                        }}
                      >
                        {recommendationError}
                      </p>
                    )}

                    {recommendations.length > 0 ? (
                      <div className="recommendation-grid">
                        {recommendations.map(
                          (recommendation) => (
                            <div
                              className="recommendation-card"
                              key={recommendation.id}
                            >
                              <Quote
                                size={18}
                                className="recommendation-quote-icon"
                              />

                              <p className="recommendation-text">
                                {recommendation.quote}
                              </p>

                              <div className="recommendation-footer">
                                <div className="avatar-sm">
                                  {String(
                                    recommendation.name ||
                                      "User"
                                  )
                                    .split(" ")
                                    .map((part) => part[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase()}
                                </div>

                                <div>
                                  <p className="recommendation-name">
                                    {recommendation.name}
                                  </p>

                                  <p className="recommendation-role">
                                    {recommendation.role}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <p
                        style={{
                          color: "var(--text-muted)",
                          fontSize: 13,
                          margin: "0 0 18px",
                        }}
                      >
                        No recommendations yet. Be the first to share feedback.
                      </p>
                    )}

                    <div
                      style={{
                        marginTop: 20,
                        paddingTop: 20,
                        borderTop:
                          "1px solid var(--border-color)",
                      }}
                    >
                      <h3
                        style={{
                          margin: "0 0 6px",
                          fontSize: 15,
                        }}
                      >
                        Write a recommendation
                      </h3>

                      <p
                        style={{
                          margin: "0 0 16px",
                          fontSize: 12,
                          color: "var(--text-muted)",
                        }}
                      >
                        Share your experience working with or learning from me.
                      </p>

                      <form
                        className="contact-form"
                        onSubmit={
                          handleRecommendationSubmit
                        }
                      >
                        <div className="cert-form-row">
                          <input
                            type="text"
                            placeholder="Your name"
                            required
                            value={recommendationForm.name}
                            onChange={(e) =>
                              setRecommendationForm(
                                (form) => ({
                                  ...form,
                                  name: e.target.value,
                                })
                              )
                            }
                          />

                          <input
                            type="text"
                            placeholder="Your role / company"
                            required
                            value={recommendationForm.role}
                            onChange={(e) =>
                              setRecommendationForm(
                                (form) => ({
                                  ...form,
                                  role: e.target.value,
                                })
                              )
                            }
                          />
                        </div>

                        <textarea
                          rows={4}
                          placeholder="Write your feedback..."
                          required
                          value={recommendationForm.quote}
                          onChange={(e) =>
                            setRecommendationForm(
                              (form) => ({
                                ...form,
                                quote: e.target.value,
                              })
                            )
                          }
                        />

                        <button
                          type="submit"
                          className="btn-primary"
                          style={{
                            justifyContent: "center",
                          }}
                        >
                          <Send size={14} />
                          Submit Recommendation
                        </button>
                      </form>
                    </div>
                  </div>
                </Panel>
              </div>

              {/* =================================================
                  RESUME
              ================================================= */}

              <Panel id="resume">

                <PanelHeader
                  icon={FileText}
                  title="Resume"
                />

                <div className="panel-body">

                  <p className="profile-summary">
                    View my latest resume and
                    professional profile.
                  </p>

                  <a
                    className="btn-primary"
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download size={14} />
                    View Resume
                  </a>

                </div>

              </Panel>

              {/* =================================================
                  LEARNING
              ================================================= */}

              <Panel>

                <PanelHeader
                  icon={Rocket}
                  title="Currently Learning"
                />

                <div className="panel-body">

                  <div className="pill-row">

                    {displayLearning.map(
                      (item) => {

                        const title =
                          typeof item ===
                          "string"
                            ? item
                            : item.title;

                        return (
                          <span
                            className="pill"
                            key={
                              item.id ||
                              title
                            }
                          >
                            {title}
                          </span>
                        );
                      }
                    )}

                  </div>

                </div>

              </Panel>

              {/* =================================================
                  CAREER
              ================================================= */}

              <Panel>

                <PanelHeader
                  icon={BookOpen}
                  title="My Career Journey"
                />

                <div className="panel-body">

                  <div className="journey">

                    {[
                      {
                        label: "10th",
                        value: "83.40%",
                      },
                      {
                        label: "12th",
                        value: "70.67%",
                      },
                      {
                        label: "Diploma",
                        value: "88.24%",
                      },
                      {
                        label: "B.Tech (IT)",
                        value: "8.52 CGPA",
                        current: true,
                      },
                    ].map(
                      (step) => (
                        <div
                          className="journey-step"
                          key={
                            step.label
                          }
                        >

                          <span
                            className={
                              "journey-dot" +
                              (step.current
                                ? " current"
                                : "")
                            }
                          />

                          <span className="journey-label">
                            {
                              step.label
                            }
                          </span>

                          <span className="journey-value">
                            {
                              step.value
                            }
                          </span>

                        </div>
                      )
                    )}

                  </div>

                </div>

              </Panel>

              {/* =================================================
                  CONTACT
              ================================================= */}

              <Panel id="contact">

                <PanelHeader
                  icon={MessageSquare}
                  title="Get in Touch"
                />

                <div className="panel-body">

                  {contactSent && (
                    <p
                      className="contact-sent"
                      style={{
                        marginBottom: 14,
                      }}
                    >
                      Message sent
                      successfully. 🎉
                    </p>
                  )}

                  {contactError && (
                    <p
                      style={{
                        color: "#ef4444",
                        marginBottom: 14,
                        fontSize: 13,
                      }}
                    >
                      {contactError}
                    </p>
                  )}

                  {/* FORM NEVER DISAPPEARS */}

                  <form
                    className="contact-form"
                    onSubmit={
                      handleContactSubmit
                    }
                  >

                    <div className="cert-form-row">

                      <input
                        type="text"
                        placeholder="Your name"
                        required
                        value={
                          contactForm.name
                        }
                        onChange={(e) =>
                          setContactForm(
                            (form) => ({
                              ...form,
                              name: e
                                .target
                                .value,
                            })
                          )
                        }
                      />

                      <input
                        type="email"
                        placeholder="Your email"
                        required
                        value={
                          contactForm.email
                        }
                        onChange={(e) =>
                          setContactForm(
                            (form) => ({
                              ...form,
                              email:
                                e
                                  .target
                                  .value,
                            })
                          )
                        }
                      />

                    </div>

                    <textarea
                      rows={4}
                      placeholder="Write your message..."
                      required
                      value={
                        contactForm.message
                      }
                      onChange={(e) =>
                        setContactForm(
                          (form) => ({
                            ...form,
                            message:
                              e.target
                                .value,
                          })
                        )
                      }
                    />

                    <button
                      type="submit"
                      className="btn-primary"
                      style={{
                        justifyContent:
                          "center",
                      }}
                    >
                      <Send size={14} />
                      Send Message
                    </button>

                    <p className="contact-note">
                      Your message is sent
                      to the portfolio backend.
                    </p>

                  </form>

                </div>

              </Panel>

            </div>

            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <div className="content-side">

              {/* QR */}

              <Panel className="qr-card">

                <a
                  href={
                    typeof window !==
                    "undefined"
                      ? window.location.href
                      : "/"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open portfolio"
                  style={{
                    width: 74,
                    height: 74,
                    display: "grid",
                    placeItems: "center",
                    background: "#ffffff",
                    borderRadius: 10,
                    overflow: "hidden",
                    flexShrink: 0,
                    border: "1px solid var(--border)",
                  }}
                >
                  <img
                    src={
                      `https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=8&data=${encodeURIComponent(
                        typeof window !==
                        "undefined"
                          ? window.location.href
                          : "https://github.com/ManikPhad5"
                      )}`
                    }
                    alt="QR code to open Manik Phad portfolio"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </a>

                <div
                  style={{
                    minWidth: 0,
                  }}
                >

                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: 13,
                      margin:
                        "0 0 4px",
                    }}
                  >
                    Scan to view my
                    complete profile
                  </p>

                  <p
                    style={{
                      color:
                        "var(--text-secondary)",
                      fontSize: 11.5,
                      margin: "0 0 8px",
                    }}
                  >
                    Opens this portfolio directly.
                  </p>

                  <a
                    href={
                      typeof window !==
                      "undefined"
                        ? window.location.href
                        : "/"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    style={{
                      display: "inline-flex",
                    }}
                  >
                    Open Profile
                    <ExternalLink size={12} />
                  </a>

                </div>

              </Panel>

              {/* SHARE */}

              <button
                type="button"
                className="btn-primary"
                style={{
                  justifyContent:
                    "center",
                  marginTop: -8,
                }}
                onClick={() => {
                  if (
                    navigator.share
                  ) {
                    navigator.share({
                      title:
                        "Manik Phad - Developer Portfolio",
                      text:
                        "Check out my developer profile",
                      url:
                        window.location.href,
                    });
                  } else if (
                    navigator.clipboard
                  ) {
                    navigator.clipboard.writeText(
                      window.location.href
                    );

                    alert(
                      "Profile link copied!"
                    );
                  }
                }}
              >
                <Share2 size={14} />
                Share Profile
              </button>

              {/* WHY ME */}

              <Panel>

                <PanelHeader
                  icon={Star}
                  title="Why Consider Me?"
                />

                <div className="panel-body">

                  {WHY_ME.map(
                    (point) => (
                      <div
                        className="check-item"
                        key={point}
                      >
                        <CheckCircle2
                          size={15}
                        />
                        {point}
                      </div>
                    )
                  )}

                </div>

              </Panel>

              {/* QUICK LINKS */}

              <Panel>

                <PanelHeader
                  icon={ExternalLink}
                  title="Quick Links"
                />

                <div className="panel-body">

                  {/* GITHUB */}

                  <a
                    className="list-item"
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      cursor:
                        "pointer",
                      textDecoration:
                        "none",
                      color:
                        "inherit",
                    }}
                  >

                    <div className="list-icon">
                      <GithubIcon
                        size={14}
                      />
                    </div>

                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 13,
                          fontWeight: 500,
                        }}
                      >
                        GitHub
                      </p>

                      <p
                        style={{
                          margin: 0,
                          fontSize: 11,
                          color:
                            "var(--text-muted)",
                        }}
                      >
                        View my repositories
                      </p>
                    </div>

                  </a>

                  {/* LINKEDIN */}

                  <a
                    className="list-item"
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      cursor:
                        "pointer",
                      textDecoration:
                        "none",
                      color:
                        "inherit",
                    }}
                  >

                    <div className="list-icon">
                      <LinkedinIcon
                        size={14}
                      />
                    </div>

                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 13,
                          fontWeight: 500,
                        }}
                      >
                        LinkedIn
                      </p>

                      <p
                        style={{
                          margin: 0,
                          fontSize: 11,
                          color:
                            "var(--text-muted)",
                        }}
                      >
                        Connect with me
                      </p>
                    </div>

                  </a>

                  {/* EMAIL */}

                  <a
                    className="list-item"
                    href={`mailto:${profileEmail}`}
                    style={{
                      cursor:
                        "pointer",
                      textDecoration:
                        "none",
                      color:
                        "inherit",
                    }}
                  >

                    <div className="list-icon">
                      <Mail size={14} />
                    </div>

                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 13,
                          fontWeight: 500,
                        }}
                      >
                        Email
                      </p>

                      <p
                        style={{
                          margin: 0,
                          fontSize: 11,
                          color:
                            "var(--text-muted)",
                        }}
                      >
                        {profileEmail}
                      </p>
                    </div>

                  </a>

                  {/* PHONE */}

                  <a
                    className="list-item"
                    href={`tel:${profilePhone}`}
                    style={{
                      cursor:
                        "pointer",
                      textDecoration:
                        "none",
                      color:
                        "inherit",
                    }}
                  >

                    <div className="list-icon">
                      <Phone size={14} />
                    </div>

                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 13,
                          fontWeight: 500,
                        }}
                      >
                        Phone
                      </p>

                      <p
                        style={{
                          margin: 0,
                          fontSize: 11,
                          color:
                            "var(--text-muted)",
                        }}
                      >
                        {profilePhone}
                      </p>
                    </div>

                  </a>

                  {/* RESUME */}

                  <a
                    className="list-item"
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      cursor:
                        "pointer",
                      textDecoration:
                        "none",
                      color:
                        "inherit",
                    }}
                  >

                    <div className="list-icon">
                      <FileText size={14} />
                    </div>

                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 13,
                          fontWeight: 500,
                        }}
                      >
                        Resume
                      </p>

                      <p
                        style={{
                          margin: 0,
                          fontSize: 11,
                          color:
                            "var(--text-muted)",
                        }}
                      >
                        View my resume
                      </p>
                    </div>

                  </a>

                </div>

              </Panel>

              {/* CTA */}

              <Panel className="cta-panel">

                <Rocket
                  size={84}
                  className="bg-rocket"
                />

                <p className="cta-title">
                  Open to exciting
                  opportunities!
                </p>

                <p className="cta-text">
                  Looking for a role where
                  I can grow, contribute and
                  make an impact.
                </p>

                <button
                  type="button"
                  className="btn-primary"
                  onClick={() =>
                    scrollToSection(
                      "contact"
                    )
                  }
                >
                  Let's Connect
                  <ExternalLink
                    size={13}
                  />
                </button>

              </Panel>

              {/* SIGNATURE */}

              <Panel className="signature-card">

                <p className="signature-tag">
                  Crafted with dedication by
                </p>

                <p className="signature-name">
                  {profileName}
                </p>

                <div className="signature-underline" />

                <p className="signature-role">
                  {profileTitle}
                </p>

              </Panel>

            </div>

          </div>

        </div>

        {/* =================================================
            ADMIN LOGIN / ADMIN PANEL
        ================================================= */}

        {showAdminLogin && !showAdmin && (
          <div style={{ position: "fixed", inset: 0, zIndex: 3000, background: "rgba(3,8,20,.78)", backdropFilter: "blur(8px)", display: "grid", placeItems: "center", padding: 20 }}>
            <div className="panel" style={{ width: "min(420px, 100%)", padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <div><p style={{ margin: 0, fontWeight: 700, fontSize: 18 }}>Admin Login</p><p style={{ margin: "5px 0 0", color: "var(--text-muted)", fontSize: 12 }}>Manage your portfolio securely.</p></div>
                <button className="icon-btn" type="button" onClick={() => setShowAdminLogin(false)}><X size={16} /></button>
              </div>
              {adminError && <p style={{ color: "#ef4444", fontSize: 12 }}>{adminError}</p>}
              <form onSubmit={handleAdminLogin} style={{ display: "grid", gap: 12 }}>
                <input type="text" placeholder="Username" autoComplete="username" value={adminLogin.username} onChange={(e) => setAdminLogin(v => ({ ...v, username: e.target.value }))} required />
                <input type="password" placeholder="Password" autoComplete="current-password" value={adminLogin.password} onChange={(e) => setAdminLogin(v => ({ ...v, password: e.target.value }))} required />
                <button className="btn-primary" type="submit" style={{ justifyContent: "center" }}><LogIn size={14} /> Login as Admin</button>
              </form>
            </div>
          </div>
        )}

        {showAdmin && adminToken && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 2999,
              background: "linear-gradient(180deg, rgba(2,6,23,.92), rgba(3,8,20,.96))",
              backdropFilter: "blur(14px)",
              overflowY: "auto",
              padding: "clamp(12px, 3vw, 28px)",
            }}
          >
            <div style={{ maxWidth: 1320, margin: "0 auto", border: "1px solid rgba(148,163,184,.18)", borderRadius: 24, overflow: "hidden", background: "linear-gradient(145deg, rgba(15,23,42,.98), rgba(9,15,29,.98))", boxShadow: "0 30px 90px rgba(0,0,0,.45)" }}>
              <div style={{ padding: "22px clamp(16px, 3vw, 30px)", display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", flexWrap: "wrap", borderBottom: "1px solid rgba(148,163,184,.12)", background: "linear-gradient(135deg, rgba(59,130,246,.13), rgba(168,85,247,.08) 55%, transparent)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(96,165,250,.35)", boxShadow: "0 8px 24px rgba(59,130,246,.18)", flexShrink: 0 }}>
                    <img src={profileImageUrl} alt="Manik Phad" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: "clamp(20px, 2.4vw, 27px)", fontWeight: 800, letterSpacing: "-.03em" }}>Admin Dashboard</p>
                    <p style={{ margin: "5px 0 0", fontSize: 12, color: "var(--text-muted)" }}>Manage your portfolio content from one place.</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button className="btn-primary" type="button" onClick={adminLogout} style={{ borderRadius: 12 }}><LogOut size={14} /> Logout</button>
                  <button className="icon-btn" type="button" onClick={() => setShowAdmin(false)} title="Close admin dashboard" style={{ width: 40, height: 40, borderRadius: 12 }}><X size={18} /></button>
                </div>
              </div>

              <div className="admin-responsive-grid" style={{ display: "grid", gridTemplateColumns: "minmax(180px, 230px) minmax(0, 1fr)", minHeight: "calc(100vh - 180px)" }}>
                <div style={{ padding: 16, borderRight: "1px solid rgba(148,163,184,.12)", background: "rgba(15,23,42,.45)" }}>
                  <p style={{ margin: "4px 8px 10px", fontSize: 10, textTransform: "uppercase", letterSpacing: ".12em", color: "var(--text-muted)", fontWeight: 700 }}>Manage Content</p>
                  <div style={{ display: "grid", gap: 7 }}>
                    {[
                      ["profile", "Profile", User],
                      ["skills", "Skills", Layers],
                      ["projects", "Projects", FolderKanban],
                      ["experience", "Experience", Briefcase],
                      ["education", "Education", GraduationCap],
                      ["certificates", "Certificates", Award],
                      ["achievements", "Achievements", Trophy],
                      ["learning", "Learning", BookOpen],
                    ].map(([tab, label, Icon]) => {
                      const active = adminTab === tab;
                      return (
                        <button key={tab} type="button" onClick={() => { setAdminTab(tab); resetAdminForm(tab); setAdminError(""); setAdminMessage(""); }} style={{ width: "100%", minHeight: 46, borderRadius: 13, border: active ? "1px solid rgba(96,165,250,.38)" : "1px solid transparent", background: active ? "linear-gradient(135deg, rgba(59,130,246,.28), rgba(37,99,235,.16))" : "transparent", color: active ? "#fff" : "var(--text-muted)", display: "flex", alignItems: "center", gap: 10, padding: "0 12px", cursor: "pointer", fontSize: 12, fontWeight: active ? 700 : 500, textAlign: "left", transition: "all .18s ease" }}>
                          <Icon size={15} /><span>{label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ padding: "clamp(16px, 3vw, 28px)", minWidth: 0 }}>
                  <div style={{ marginBottom: 18 }}>
                    <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800, textTransform: "capitalize" }}>{adminTab}</h2>
                    <p style={{ margin: "5px 0 0", fontSize: 12, color: "var(--text-muted)" }}>{adminTab === "profile" ? "Update your personal and professional profile details." : `Add, edit or delete your ${adminTab} content.`}</p>
                  </div>

                  {adminMessage && <div style={{ marginBottom: 14, padding: "11px 13px", borderRadius: 12, border: "1px solid rgba(34,197,94,.24)", background: "rgba(34,197,94,.08)", color: "#86efac", fontSize: 12 }}>{adminMessage}</div>}
                  {adminError && <div style={{ marginBottom: 14, padding: "11px 13px", borderRadius: 12, border: "1px solid rgba(239,68,68,.24)", background: "rgba(239,68,68,.08)", color: "#fca5a5", fontSize: 12 }}>{adminError}</div>}

                  {adminTab === "skills" && (
                    <>
                      <div style={{ padding: 16, borderRadius: 16, border: "1px solid rgba(148,163,184,.12)", background: "rgba(15,23,42,.55)" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}><input placeholder="Skill name" value={adminForms.skills.name} onChange={e => setAdminForm("skills", "name", e.target.value)} /><input placeholder="Category" value={adminForms.skills.category} onChange={e => setAdminForm("skills", "category", e.target.value)} /></div>
                      </div>
                      <AdminRows resource="skills" items={skills} titleKey="name" subtitleKey="category" onEdit={editAdminItem} onDelete={deleteAdminResource} />
                    </>
                  )}

                  {adminTab === "projects" && (
                    <>
                      <div style={{ padding: 16, borderRadius: 16, border: "1px solid rgba(148,163,184,.12)", background: "rgba(15,23,42,.55)", display: "grid", gap: 10 }}>
                        <div className="cert-form-row"><input placeholder="Project title" value={adminForms.projects.title} onChange={e => setAdminForm("projects", "title", e.target.value)} /><input placeholder="Tags comma separated" value={adminForms.projects.tags} onChange={e => setAdminForm("projects", "tags", e.target.value)} /></div><textarea rows={4} placeholder="Description" value={adminForms.projects.description} onChange={e => setAdminForm("projects", "description", e.target.value)} /><div className="cert-form-row"><input placeholder="GitHub URL" value={adminForms.projects.githubUrl} onChange={e => setAdminForm("projects", "githubUrl", e.target.value)} /><input placeholder="Demo URL" value={adminForms.projects.demoUrl} onChange={e => setAdminForm("projects", "demoUrl", e.target.value)} /></div><div className="cert-form-row"><input placeholder="Image URL" value={adminForms.projects.image} onChange={e => setAdminForm("projects", "image", e.target.value)} /><label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}><input type="checkbox" checked={!!adminForms.projects.featured} onChange={e => setAdminForm("projects", "featured", e.target.checked)} /> Featured</label></div>
                      </div>
                      <AdminRows resource="projects" items={projects} titleKey="title" subtitleKey="description" onEdit={editAdminItem} onDelete={deleteAdminResource} />
                    </>
                  )}

                  {adminTab === "experience" && (
                    <>
                      <div style={{ padding: 16, borderRadius: 16, border: "1px solid rgba(148,163,184,.12)", background: "rgba(15,23,42,.55)", display: "grid", gap: 10 }}><div className="cert-form-row"><input placeholder="Role" value={adminForms.experience.role} onChange={e => setAdminForm("experience", "role", e.target.value)} /><input placeholder="Company" value={adminForms.experience.company} onChange={e => setAdminForm("experience", "company", e.target.value)} /></div><input placeholder="Period" value={adminForms.experience.period} onChange={e => setAdminForm("experience", "period", e.target.value)} /><textarea rows={6} placeholder="One bullet per line" value={adminForms.experience.bullets} onChange={e => setAdminForm("experience", "bullets", e.target.value)} /></div>
                      <AdminRows resource="experience" items={experiences} titleKey="role" subtitleKey="company" onEdit={editAdminItem} onDelete={deleteAdminResource} />
                    </>
                  )}

                  {adminTab === "education" && (
                    <>
                      <div style={{ padding: 16, borderRadius: 16, border: "1px solid rgba(148,163,184,.12)", background: "rgba(15,23,42,.55)" }}><div className="cert-form-row"><input placeholder="Degree" value={adminForms.education.degree} onChange={e => setAdminForm("education", "degree", e.target.value)} /><input placeholder="School" value={adminForms.education.school} onChange={e => setAdminForm("education", "school", e.target.value)} /><input placeholder="Period" value={adminForms.education.period} onChange={e => setAdminForm("education", "period", e.target.value)} /><input placeholder="CGPA" value={adminForms.education.cgpa} onChange={e => setAdminForm("education", "cgpa", e.target.value)} /></div></div>
                      <AdminRows resource="education" items={education ? [education] : []} titleKey="degree" subtitleKey="school" onEdit={editAdminItem} onDelete={deleteAdminResource} />
                    </>
                  )}

                  {adminTab === "certificates" && (
                    <>
                      <div style={{ padding: 16, borderRadius: 16, border: "1px solid rgba(148,163,184,.12)", background: "rgba(15,23,42,.55)" }}><div className="cert-form-row"><input placeholder="Certificate name" value={adminForms.certificates.name} onChange={e => setAdminForm("certificates", "name", e.target.value)} /><input placeholder="Issuer" value={adminForms.certificates.issuer} onChange={e => setAdminForm("certificates", "issuer", e.target.value)} /><input placeholder="Date" value={adminForms.certificates.date} onChange={e => setAdminForm("certificates", "date", e.target.value)} /><input placeholder="URL" value={adminForms.certificates.url} onChange={e => setAdminForm("certificates", "url", e.target.value)} /></div></div>
                      <AdminRows resource="certificates" items={certificates} titleKey="name" subtitleKey="issuer" onEdit={editAdminItem} onDelete={deleteAdminResource} />
                    </>
                  )}

                  {adminTab === "achievements" && (
                    <>
                      <div style={{ padding: 16, borderRadius: 16, border: "1px solid rgba(148,163,184,.12)", background: "rgba(15,23,42,.55)" }}><div className="cert-form-row"><input placeholder="Achievement" value={adminForms.achievements.label} onChange={e => setAdminForm("achievements", "label", e.target.value)} /><input placeholder="Year" value={adminForms.achievements.year} onChange={e => setAdminForm("achievements", "year", e.target.value)} /></div></div>
                      <AdminRows resource="achievements" items={achievements} titleKey="label" subtitleKey="year" onEdit={editAdminItem} onDelete={deleteAdminResource} />
                    </>
                  )}

                  {adminTab === "learning" && (
                    <>
                      <div style={{ padding: 16, borderRadius: 16, border: "1px solid rgba(148,163,184,.12)", background: "rgba(15,23,42,.55)", display: "grid", gap: 10 }}><div className="cert-form-row"><input placeholder="Title" value={adminForms.learning.title} onChange={e => setAdminForm("learning", "title", e.target.value)} /><input placeholder="Status" value={adminForms.learning.status} onChange={e => setAdminForm("learning", "status", e.target.value)} /></div><textarea rows={4} placeholder="Description" value={adminForms.learning.description} onChange={e => setAdminForm("learning", "description", e.target.value)} /></div>
                      <AdminRows resource="learning" items={learning} titleKey="title" subtitleKey="status" onEdit={editAdminItem} onDelete={deleteAdminResource} />
                    </>
                  )}

                  {adminTab === "profile" && (
                    <div style={{ padding: 16, borderRadius: 16, border: "1px solid rgba(148,163,184,.12)", background: "rgba(15,23,42,.55)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, paddingBottom: 14, borderBottom: "1px solid rgba(148,163,184,.1)" }}>
                        <button
                          type="button"
                          onClick={() => openProfileImage(adminForms.profile.profileImageUrl || DEFAULT_PROFILE_IMAGE)}
                          aria-label="Preview profile photo"
                          style={{ width: 82, height: 82, borderRadius: 20, overflow: "hidden", flexShrink: 0, border: "1px solid rgba(96,165,250,.35)", background: "#0b1220", boxShadow: "0 10px 25px rgba(0,0,0,.22)", padding: 0, cursor: "zoom-in" }}
                        >
                          <img
                            src={normalizeProfileImageUrl(adminForms.profile.profileImageUrl || DEFAULT_PROFILE_IMAGE)}
                            alt="Profile"
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                            onError={(e) => {
                              e.currentTarget.src = DEFAULT_PROFILE_IMAGE;
                            }}
                          />
                        </button>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 800, fontSize: 14 }}>{adminForms.profile.name || "Manik Phad"}</div>
                          <div style={{ color: "var(--text-muted)", fontSize: 11, marginTop: 4 }}>Change your profile photo anytime from here.</div>
                          <div style={{ color: "#93c5fd", fontSize: 10, marginTop: 5 }}>Choose a photo directly from your device, then click <b>Update Profile</b>.</div>
                        </div>
                      </div>

                      <div style={{ marginBottom: 16, padding: 14, borderRadius: 15, border: "1px solid rgba(96,165,250,.18)", background: "linear-gradient(135deg, rgba(59,130,246,.08), rgba(168,85,247,.05))" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 750, color: "#e5e7eb" }}>Profile Photo</div>
                            <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 3 }}>Select JPG, PNG or WEBP directly from your device. Large photos are automatically compressed.</div>
                          </div>
                          <button
                            type="button"
                            className="icon-btn"
                            onClick={() => {
                              localStorage.removeItem(PROFILE_IMAGE_STORAGE_KEY);
                              setAdminForm("profile", "profileImageUrl", DEFAULT_PROFILE_IMAGE);
                              setAdminMessage("Default profile photo selected. Click Update Profile to save it.");
                            }}
                            style={{ borderRadius: 10, padding: "7px 10px", fontSize: 11 }}
                          >
                            Reset Photo
                          </button>
                        </div>
                        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                          <label
                            htmlFor="profile-photo-picker"
                            className="btn-primary"
                            style={{ cursor: "pointer", borderRadius: 12, display: "inline-flex", alignItems: "center", gap: 7 }}
                          >
                            <Download size={14} />
                            Choose Photo
                          </label>
                          <input
                            id="profile-photo-picker"
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/gif"
                            onChange={handleProfileImageChange}
                            style={{ display: "none" }}
                          />
                          <span style={{ fontSize: 10, color: "var(--text-muted)" }}>Photo stays with your profile data after you save.</span>
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
                        {[['name','Name'],['title','Title'],['email','Email'],['phone','Phone'],['location','Location'],['githubUrl','GitHub URL'],['linkedinUrl','LinkedIn URL'],['resumeUrl','Resume URL'],['dsaProblems','DSA Problems']].map(([k,l]) => <label key={k} style={{ display:'grid', gap:5, fontSize:11, color:'var(--text-muted)' }}>{l}<input value={adminForms.profile[k] ?? ""} onChange={e=>setAdminForm("profile",k,e.target.value)} /></label>)}
                      </div>
                      <label style={{ display:"grid", gap:5, marginTop:10, fontSize:11, color:"var(--text-muted)" }}>About<textarea rows={5} value={adminForms.profile.about || ""} onChange={e=>setAdminForm("profile","about",e.target.value)} /></label>
                      <label style={{ display:"flex", gap:8, alignItems:"center", marginTop:10, fontSize:12 }}><input type="checkbox" checked={!!adminForms.profile.openToOpportunities} onChange={e=>setAdminForm("profile","openToOpportunities",e.target.checked)} /> Open to opportunities</label>
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 9, marginTop: 16, flexWrap: "wrap" }}>
                    {adminTab !== "profile" && <button className="btn-primary" type="button" disabled={adminSaving} onClick={() => saveAdminResource(adminTab)} style={{ borderRadius: 12 }}><Save size={14} /> {adminSaving ? "Saving..." : (adminEditingId !== null ? "Update" : "Add")}</button>}
                    {adminTab === "profile" && <button className="btn-primary" type="button" disabled={adminSaving} onClick={async()=>{ setAdminError(""); setAdminMessage(""); setAdminSaving(true); try {
                                      const payload = adminPayload("profile");
                                      const hasId = !!adminForms.profile.id;
                                      const url = hasId ? `${API_BASE_URL}/profile/${adminForms.profile.id}` : `${API_BASE_URL}/profile`;
                                      const method = hasId ? "PUT" : "POST";
                                      const r = await fetch(url,{method,headers:adminHeaders(true),body:JSON.stringify(payload)});
                                      const t = await r.text();
                                      if(!r.ok) throw new Error(t||`Profile ${method} failed: ${r.status}`);
                                      const savedImage = adminForms.profile.profileImageUrl || DEFAULT_PROFILE_IMAGE;
                                      if (savedImage.startsWith("data:image/")) localStorage.setItem(PROFILE_IMAGE_STORAGE_KEY, savedImage);
                                      else localStorage.removeItem(PROFILE_IMAGE_STORAGE_KEY);
                                      await loadProfile(); await loadDashboard();
                                      setAdminMessage(hasId ? "Profile updated successfully" : "Profile created successfully");
                                    } catch(e){ setAdminError(e.message||"Could not save profile"); } finally { setAdminSaving(false); } }} style={{ borderRadius: 12 }}><Save size={14}/> {adminSaving ? "Saving..." : (adminForms.profile.id ? "Update Profile" : "Create Profile")}</button>}
                    <button className="icon-btn" type="button" onClick={() => resetAdminForm(adminTab)} style={{ borderRadius: 12 }}><Plus size={14} /> New</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showProfileImageModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Profile photo preview"
            onClick={closeProfileImage}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 5000,
              background: "rgba(0,0,0,.88)",
              backdropFilter: "blur(10px)",
              display: "grid",
              placeItems: "center",
              padding: 20,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "min(92vw, 720px)",
                maxHeight: "92vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", gap: 8 }}>
                {adminToken && (
                  <>
                    <label
                      htmlFor="profile-photo-picker-modal"
                      className="btn-primary"
                      style={{ cursor: "pointer", borderRadius: 12, display: "inline-flex", alignItems: "center", gap: 7 }}
                    >
                      <Pencil size={14} />
                      Change Photo
                    </label>
                    <input
                      id="profile-photo-picker-modal"
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      onChange={handleProfileImageChange}
                      style={{ display: "none" }}
                    />
                  </>
                )}
                <button
                  type="button"
                  className="icon-btn"
                  onClick={closeProfileImage}
                  aria-label="Close profile photo"
                  style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(15,23,42,.9)" }}
                >
                  <X size={18} />
                </button>
              </div>

              <div
                style={{
                  position: "relative",
                  width: "min(82vw, 620px)",
                  height: "min(72vh, 620px)",
                  borderRadius: 28,
                  overflow: "hidden",
                  background: "#050914",
                  border: "1px solid rgba(255,255,255,.14)",
                  boxShadow: "0 25px 80px rgba(0,0,0,.5)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <img
                  src={profileImageModalSrc || profileImageUrl}
                  alt="Manik Phad profile"
                  style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                  onError={(e) => { e.currentTarget.src = DEFAULT_PROFILE_IMAGE; }}
                />
              </div>

              <div style={{ color: "rgba(255,255,255,.72)", fontSize: 11, textAlign: "center" }}>
                Click outside to close{adminToken ? <> · Use <b>Change Photo</b> anytime to select a new photo from your device</> : <> · Login as Admin to change the profile photo</>}
              </div>
            </div>
          </div>
        )}

        {/* =================================================
            MOBILE NAV
        ================================================= */}

        <nav className="mobile-nav">

          {MOBILE_NAV.map(
            ({
              label,
              id,
              icon: Icon,
            }) => (
              <button
                key={id}
                type="button"
                className="mobile-nav-item"
                onClick={() =>
                  scrollToSection(
                    id
                  )
                }
              >
                <Icon size={19} />
                {label}
              </button>
            )
          )}

        </nav>

        <style>{`
          @media (max-width: 760px) {
            .admin-responsive-grid { grid-template-columns: 1fr !important; }
            .admin-responsive-grid > div:first-child { border-right: 0 !important; border-bottom: 1px solid rgba(148,163,184,.12); }
            .admin-responsive-grid > div:first-child > div { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          }
        `}</style>

      </div>
    </>
  );
}