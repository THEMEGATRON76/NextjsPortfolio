// hooks/useGitHubUser.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useGitHubUser = () => {
  const username = "THEMEGATRON76";
  const [userData, setUserData] = useState({
    stars: 0,
    repositories: 0,
    commits: 0,
    followers: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get user basic info
        const userResponse = await axios.get(`https://api.github.com/users/${username}`);
        console.log("User response:", userResponse.data);
        
        // Get user repositories
        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);
        
        // Calculate total stars from all repositories
        const totalStars = reposResponse.data.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        
        // Get commits count (approximate from recent activity)
        let totalCommits = 0;
        try {
          console.log("Fetching commits...");
          const commitsResponse = await axios.get(`https://api.github.com/search/commits?q=author:${username}&per_page=100`, {
            headers: {
              'Accept': 'application/vnd.github.cloak-preview'
            }
          });
          totalCommits = commitsResponse.data.total_count;
        } catch (commitError) {
          console.log('Could not fetch commits data:', commitError.message);
          // Fallback: estimate based on recent activity
          totalCommits = reposResponse.data.length * 5; // rough estimate
        }

        const finalData = {
          stars: totalStars,
          repositories: userResponse.data.public_repos,
          commits: totalCommits,
          followers: userResponse.data.followers,
        };
        
        setUserData(finalData);

      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch GitHub data');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  return { userData, loading, error };
};

export default useGitHubUser;