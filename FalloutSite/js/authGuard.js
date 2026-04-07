(function initAuthGuard() {
    const redirectToLogin = () => {
        if (!window.location.pathname.endsWith('/index.html') && window.location.pathname !== '/') {
            window.location.href = '/index.html';
        }
    };

    const runGuard = async () => {
        if (!window.supabaseClient?.auth) {
            redirectToLogin();
            return false;
        }

        const { data, error } = await window.supabaseClient.auth.getSession();

        if (error || !data?.session) {
            redirectToLogin();
            return false;
        }

        return true;
    };

    window.authGuardReady = runGuard();

    window.supabaseClient?.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
            redirectToLogin();
        }
    });
})();
