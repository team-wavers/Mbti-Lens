module.exports = {
    apps: [
        {
            name: "mbti-lens.front",
            script: "next",
            args: "start",
            cwd: "./",
            exec_mode: "cluster",
            instances: 0,
            autorestart: true,
            listen_timeout: 50000,
            kill_timeout: 5000,
        },
    ],
};
