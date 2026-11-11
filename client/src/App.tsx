/* Signal Harbor design reminder: public-facing single-page flow, no dead-end routes, direct Discord CTA. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import PolicyPage from "./pages/PolicyPage";
import Support from "./pages/Support";
import SupportNew from "./pages/SupportNew";
import SupportTicket from "./pages/SupportTicket";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/yonetim" component={Admin} />
      <Route path="/destek" component={Support} />
      <Route path="/destek/yeni" component={SupportNew} />
      <Route path="/destek/:number" component={SupportTicket} />
      <Route path="/404" component={NotFound} />
      <Route path="/hizmet-sartlari"><PolicyPage type="terms" /></Route>
      <Route path="/gizlilik-politikasi"><PolicyPage type="privacy" /></Route>
      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * The SupportFlow pre-sales button (widget.js in index.html) shows on every page except the
 * admin panel and the post-sales support area. A CSS rule hides it, so it works no matter
 * when the async script finishes loading.
 */
function WidgetVisibility() {
  const [location] = useLocation();
  const hidden = location.startsWith("/yonetim") || location.startsWith("/destek");
  return hidden ? <style>{`[data-supportflow-widget]{display:none!important}`}</style> : null;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <WidgetVisibility />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
