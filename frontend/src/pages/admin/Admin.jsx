import { useEffect, useState, useMemo } from "react";
import { supabase } from "../../lib/supabase";
import { Button } from "../../components/ui/button";
import { useToast } from "../../hooks/use-toast";
import { useAuth } from "../../hooks/AuthContext";
import AdminLayout from "../../components/AdminLayout";
import {
  Users,
  Mail,
  Phone,
  Building,
  Calendar,
  ChevronDown,
  Download,
  BarChart3,
  TrendingUp,
  Loader2
} from "lucide-react";

const statusColors = {
  new: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  contacted: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  qualified: "bg-green-500/10 text-green-500 border-green-500/20",
  closed: "bg-muted text-muted-foreground border-border",
};

const Admin = () => {
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const [leads, setLeads] = useState([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (isAdmin) fetchLeads();
  }, [isAdmin]);

  const fetchLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch leads",
        variant: "destructive",
      });
    } finally {
      setIsLoadingLeads(false);
    }
  };

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      const { data, error } = await supabase
        .from("leads")
        .update({ status: newStatus })
        .eq("id", leadId)
        .select();

      if (error) throw error;
      
      if (!data || data.length === 0) {
        throw new Error("Update failed. You might need to add an 'UPDATE' policy for this table in your Supabase Dashboard RLS settings.");
      }

      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        )
      );

      toast({
        title: "Status Updated",
        description: `Lead status changed to ${newStatus}`,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Permission Error",
        description: "Status did not save. Please ensure 'UPDATE' is allowed in your Supabase RLS policies for the 'leads' table.",
        variant: "destructive",
      });
      // Optionally re-fetch to revert the optimistic UI if needed,
      // but here we didn't optimistically update first, we only update state on success.
    }
  };

  const exportToCSV = () => {
    const filteredLeads =
      statusFilter === "all"
        ? leads
        : leads.filter((lead) => lead.status === statusFilter);

    const headers = ["Name", "Email", "Phone", "Business", "Message", "Status", "Date"];
    const csvContent = [
      headers.join(","),
      ...filteredLeads.map((lead) =>
        [
          `"${lead.name}"`,
          `"${lead.email}"`,
          `"${lead.phone || ""}"`,
          `"${lead.business_name || ""}"`,
          `"${lead.message.replace(/"/g, '""')}"`,
          `"${lead.status}"`,
          `"${new Date(lead.created_at).toLocaleDateString()}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `${filteredLeads.length} leads exported to CSV`,
    });
  };

  const filteredLeads =
    statusFilter === "all"
      ? leads
      : leads.filter((lead) => lead.status === statusFilter);

  const chartData = useMemo(() => {
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split("T")[0];
    }).reverse();

    const counts = last7Days.map(date => {
      return leads.filter(l => l.created_at.startsWith(date)).length;
    });

    const maxCount = Math.max(...counts, 1);

    return { labels: last7Days, counts, maxCount };
  }, [leads]);

  return (
    <AdminLayout title="Dashboard Overview">
      {/* Top Cards: Stats & Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-xl p-6 border border-border flex flex-col justify-between hover:shadow-card transition-shadow">
          <div>
            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="w-4 h-4 text-secondary" /> Total Inquiries
            </p>
            <p className="text-4xl font-bold text-foreground mt-3">{leads.length}</p>
          </div>
          <div className="mt-6 text-sm text-muted-foreground border-t border-border pt-4">
            <span className="text-secondary font-semibold">{leads.filter(l => l.status === "new").length} New</span> requests waiting for response
          </div>
        </div>
        
        <div className="bg-card rounded-xl p-6 border border-border flex flex-col justify-between hover:shadow-card transition-shadow">
          <div>
            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-green-500" /> Conversion Rate
            </p>
            <p className="text-4xl font-bold text-foreground mt-3">
              {leads.length > 0 
                ? Math.round((leads.filter(l => l.status === "closed").length / leads.length) * 100) 
                : 0}%
            </p>
          </div>
          <div className="mt-6 text-sm text-muted-foreground border-t border-border pt-4">
            <span className="text-green-500 font-semibold">{leads.filter(l => l.status === "closed").length} Closed</span> deals successfully converted
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-secondary" /> 
            Inquiry Volume Trends
          </h2>
          <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">Last 7 Days</span>
        </div>
        
        <div className="h-48 flex items-end gap-2 sm:gap-4 w-full">
          {chartData.labels.map((date, idx) => (
            <div key={date} className="flex-1 flex flex-col items-center gap-2 group relative">
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap z-10 font-medium">
                {chartData.counts[idx]} leads
              </div>
              <div className="w-full bg-secondary/10 hover:bg-secondary/20 transition-colors rounded-t-md relative flex items-end justify-center" style={{ height: '100%' }}>
                <div 
                  className="w-full bg-secondary rounded-t-md transition-all duration-700 ease-out" 
                  style={{ height: `${(chartData.counts[idx] / chartData.maxCount) * 100}%` }}
                />
              </div>
              <span className="text-[10px] sm:text-xs text-muted-foreground rotate-45 sm:rotate-0 origin-left truncate w-full text-center mt-1">
                {new Date(date).toLocaleDateString(undefined, { weekday: 'short' })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Leads Table */}
      <div className="bg-card rounded-xl border border-border flex flex-col shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-muted/20">
          <h2 className="text-lg font-bold">Recent Leads</h2>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none bg-background border border-border rounded-lg pl-4 pr-10 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-shadow"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="closed">Closed</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
            </div>
            
            <Button 
              variant="outline" 
              onClick={fetchLeads} 
              disabled={isLoadingLeads} 
              className="h-[42px] px-3 flex items-center justify-center gap-2 hover:text-white"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" height="16" viewBox="0 0 24 24" 
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                className={isLoadingLeads ? "animate-spin" : ""}
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
            </Button>
            
            <Button variant="outline" onClick={exportToCSV} className="hidden sm:flex h-[42px]">
              <Download className="w-4 h-4 mr-2" /> Export CSV
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/40">
              <tr>
                <th className="px-6 py-4 font-semibold tracking-wider">Contact</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Business</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Message</th>
                <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoadingLeads ? (
                <tr>
                  <td colSpan="4" className="px-6 py-16 text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-secondary mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm font-medium">Loading leads...</p>
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-16 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-muted-foreground/50" />
                    </div>
                    <p className="text-muted-foreground font-medium">No leads found matching your criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="font-semibold text-foreground mb-1 group-hover:text-secondary transition-colors">{lead.name}</div>
                      <div className="text-muted-foreground flex items-center gap-1.5 mt-1 text-xs font-medium">
                        <Mail className="w-3.5 h-3.5 flex-shrink-0" /> {lead.email}
                      </div>
                      {lead.phone && (
                        <div className="text-muted-foreground flex items-center gap-1.5 mt-1 text-xs font-medium">
                          <Phone className="w-3.5 h-3.5 flex-shrink-0" /> {lead.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-5 align-top">
                      <div className="flex items-start gap-2 mt-1">
                        <Building className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <span className="font-medium text-foreground/90 whitespace-normal">{lead.business_name || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <div className="max-w-xs xl:max-w-md text-muted-foreground/90 leading-relaxed mt-1" title={lead.message}>
                        {lead.message}
                      </div>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <div className="flex flex-col gap-3 relative w-[130px] mt-1">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className={`appearance-none text-xs font-bold px-3 py-1.5 rounded-full border cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary/50 shadow-sm transition-all ${statusColors[lead.status] || statusColors.new}`}
                        >
                          <option value="new">● New</option>
                          <option value="contacted">● Contacted</option>
                          <option value="qualified">● Qualified</option>
                          <option value="closed">● Closed</option>
                        </select>
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground px-1">
                          <Calendar className="w-3 h-3 flex-shrink-0" />
                          {new Date(lead.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;