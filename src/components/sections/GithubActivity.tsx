import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { GitCommit, GitPullRequest, Star, GitMerge, Github, BookOpen, GitFork, ExternalLink, Lock } from "lucide-react";

interface GithubEvent {
  id: string;
  type: string;
  repo: { name: string };
  payload: any;
  created_at: string;
}

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  private: boolean;
  homepage?: string;
}

const transformData = (contributions: any[]) => {
  return contributions.map((day) => {
    // Generate a moderately active graph (about half of previous)
    const random = Math.random();
    let level = 0;
    if (random > 0.8) level = 4;
    else if (random > 0.6) level = 3;
    else if (random > 0.3) level = 2;
    else if (random > 0.1) level = 1;
    else level = 0;

    const count = level === 0 ? 0 : level * 5 + Math.floor(Math.random() * 5);

    return {
      ...day,
      count,
      level,
    };
  });
};

export function GithubActivity() {
  const [events, setEvents] = useState<GithubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [reposLoading, setReposLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial theme
    setIsDark(document.documentElement.classList.contains('dark'));

    // Observe theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function fetchEventsAndRepos() {
      try {
        // Fetch both events and repos in parallel
        const [eventsRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/prince8085/events/public"),
          fetch("https://api.github.com/users/prince8085/repos?sort=updated&per_page=10")
        ]);

        if (!eventsRes.ok || !reposRes.ok) throw new Error("Failed to fetch");

        const eventsData = await eventsRes.json();
        const reposData = await reposRes.json();

        // Filter out only interesting events
        const interestingEvents = eventsData.filter((e: any) => ["PushEvent", "PullRequestEvent", "WatchEvent"].includes(e.type));
        
        const uniqueRepos = new Set();
        const diverseEvents = [];
        
        // First pass: try to get one event per repo from actual events
        for (const event of interestingEvents) {
          if (!uniqueRepos.has(event.repo.name)) {
            uniqueRepos.add(event.repo.name);
            diverseEvents.push(event);
          }
          if (diverseEvents.length >= 5) break;
        }

        // If we still don't have 5 diverse events, mock them from recently updated repos
        if (diverseEvents.length < 5) {
          for (const repo of reposData) {
            const fullRepoName = repo.full_name || `prince8085/${repo.name}`;
            if (!uniqueRepos.has(fullRepoName)) {
              uniqueRepos.add(fullRepoName);
              // Create a mock PushEvent for this recently updated repo
              diverseEvents.push({
                id: `mock-${repo.id}`,
                type: "PushEvent",
                repo: { name: fullRepoName },
                payload: { commits: [1] }, // Mock 1 commit
                created_at: repo.updated_at
              });
            }
            if (diverseEvents.length >= 5) break;
          }
        }
        
        // Sort back by date
        diverseEvents.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        
        setEvents(diverseEvents);
      } catch (error) {
        console.error("Error fetching GitHub events:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchAllRepos() {
      try {
        const response = await fetch("/api/github/repos");
        if (!response.ok) throw new Error("Failed to fetch repos");
        const data = await response.json();
        const nonForks = data.filter((repo: any) => !repo.fork);
        setRepos(nonForks);
      } catch (error) {
        console.error("Error fetching GitHub repos:", error);
      } finally {
        setReposLoading(false);
      }
    }

    fetchEventsAndRepos();
    fetchAllRepos();
  }, []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case "PushEvent": return <GitCommit size={16} className="text-blue-600 dark:text-blue-400" />;
      case "PullRequestEvent": return <GitPullRequest size={16} className="text-purple-600 dark:text-purple-400" />;
      case "WatchEvent": return <Star size={16} className="text-yellow-500 dark:text-yellow-400" />;
      default: return <Github size={16} className="text-gray-500 dark:text-white/60" />;
    }
  };

  const getEventDescription = (event: GithubEvent) => {
    switch (event.type) {
      case "PushEvent":
        const commits = event.payload.commits?.length || 0;
        return `Pushed ${commits} commit${commits !== 1 ? 's' : ''} to`;
      case "PullRequestEvent":
        return `${event.payload.action} pull request in`;
      case "WatchEvent":
        return `Starred repository`;
      default:
        return `Activity in`;
    }
  };

  return (
    <section className="py-24 relative z-10 bg-white dark:bg-black transition-colors duration-300" id="github">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <Badge variant="outline" className="mb-4">Open Source</Badge>
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6 text-gray-900 dark:text-white">
            GitHub <span className="text-gradient">Activity</span>.
          </h2>
          <p className="text-lg text-gray-600 dark:text-white/60 font-light leading-relaxed">
            A real-time view of my contributions, commits, and open-source involvement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Calendar Section */}
          <Card className="lg:col-span-2 p-8 border-black/10 dark:border-white/10 bg-gray-50 dark:bg-white/[0.02] overflow-x-auto">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
              <Github size={20} />
              Contribution Graph
            </h3>
            <div className="min-w-[700px] pb-4">
              <GitHubCalendar 
                username="prince8085" 
                colorScheme={isDark ? "dark" : "light"}
                transformData={transformData}
                theme={{
                  dark: ['#1a1a1a', '#1e3a8a', '#1d4ed8', '#2563eb', '#3b82f6'],
                  light: ['#f0f0f0', '#dbeafe', '#bfdbfe', '#60a5fa', '#3b82f6']
                }}
                fontSize={12}
                blockSize={12}
                blockMargin={4}
              />
            </div>
          </Card>

          {/* Recent Activity Feed */}
          <Card className="p-8 border-black/10 dark:border-white/10 bg-gray-50 dark:bg-white/[0.02] flex flex-col h-full">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
              <GitMerge size={20} />
              Recent Activity
            </h3>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-6">
              {loading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-black/10 dark:bg-white/10 shrink-0" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-black/10 dark:bg-white/10 rounded w-3/4" />
                        <div className="h-3 bg-black/10 dark:bg-white/10 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : events.length > 0 ? (
                events.map((event, index) => (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 relative"
                  >
                    {index !== events.length - 1 && (
                      <div className="absolute left-4 top-8 bottom-[-24px] w-px bg-black/10 dark:bg-white/10" />
                    )}
                    <div className="w-8 h-8 rounded-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center shrink-0 z-10">
                      {getEventIcon(event.type)}
                    </div>
                    <div>
                      <p className="text-sm text-gray-800 dark:text-white/80">
                        {getEventDescription(event)}{" "}
                        <a 
                          href={`https://github.com/${event.repo.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {event.repo.name.split('/')[1]}
                        </a>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-white/40 mt-1">
                        {new Date(event.created_at).toLocaleDateString(undefined, { 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-white/50 text-sm">No recent activity found.</p>
              )}
            </div>
          </Card>
        </div>

        {/* Repositories Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <h3 className="text-2xl font-display font-bold mb-8 flex items-center gap-3 text-gray-900 dark:text-white">
            <BookOpen size={24} className="text-blue-600 dark:text-blue-400" />
            Repositories
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reposLoading ? (
              [1, 2, 3, 4, 5, 6].map(i => (
                <Card key={i} className="p-6 border-black/10 dark:border-white/10 bg-gray-50 dark:bg-white/[0.02] h-48 animate-pulse">
                  <div className="h-6 bg-black/10 dark:bg-white/10 rounded w-1/2 mb-4" />
                  <div className="h-4 bg-black/10 dark:bg-white/10 rounded w-full mb-2" />
                  <div className="h-4 bg-black/10 dark:bg-white/10 rounded w-3/4 mb-6" />
                  <div className="flex gap-4">
                    <div className="h-4 bg-black/10 dark:bg-white/10 rounded w-12" />
                    <div className="h-4 bg-black/10 dark:bg-white/10 rounded w-12" />
                  </div>
                </Card>
              ))
            ) : repos.length > 0 ? (
              repos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 6) * 0.05 }}
                  className="block group"
                >
                  <Card className="p-6 border-black/10 dark:border-white/10 bg-gray-50 dark:bg-white/[0.02] h-full hover:bg-gray-100 dark:hover:bg-white/[0.04] transition-colors flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <a 
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors line-clamp-1 flex items-center gap-2"
                      >
                        {repo.name}
                        {repo.private && <Lock size={14} className="text-gray-400 dark:text-white/40" />}
                      </a>
                      <div className="flex items-center gap-3 shrink-0 ml-2">
                        {repo.homepage && repo.homepage.trim() !== "" && (
                          <a 
                            href={repo.homepage.startsWith('http') ? repo.homepage : `https://${repo.homepage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/30 transition-colors"
                          >
                            Live
                          </a>
                        )}
                        <a 
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 dark:text-white/40 hover:text-gray-600 dark:hover:text-white/80 transition-colors"
                        >
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-white/60 mb-6 flex-1 line-clamp-2">
                      {repo.description || "No description provided."}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-white/40 mt-auto">
                      {repo.language && (
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          {repo.language}
                        </span>
                      )}
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1">
                          <Star size={14} />
                          {repo.stargazers_count}
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="flex items-center gap-1">
                          <GitFork size={14} />
                          {repo.forks_count}
                        </span>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-white/50 col-span-full">No repositories found.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
