import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Button } from "../../components/ui/button";
import { Trash2, Edit2, Plus } from "lucide-react";
import AdminLayout from "../../components/AdminLayout";
import { useAuth } from "../../hooks/AuthContext";

const AdminPricing = () => {
  const { isAdmin } = useAuth();
  const [plans, setPlans] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price_inr: "",
    price_usd: "",
    features: "",
    cta: "Get Started",
    popular: false,
    order_index: 0
  });

  async function fetchPlans() {
    const { data } = await supabase
      .from("pricing_plans")
      .select("*")
      .order("order_index", { ascending: true });

    setPlans(data || []);
  }

  useEffect(() => {
    if (isAdmin) fetchPlans();
  }, [isAdmin]);

  // Verified schema: price_inr/price_usd are integer, features is jsonb.
  const toIntOrNull = (v) => {
    if (v === null || v === undefined || String(v).trim() === "") return null;
    const n = parseInt(String(v).replace(/[^\d-]/g, ""), 10);
    return Number.isFinite(n) ? n : null;
  };

  const handleSave = async () => {
    // features (jsonb): store a clean JSON array of strings, one per textarea line.
    const featuresArray = form.features
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      name: form.name,
      description: form.description,
      price_inr: toIntOrNull(form.price_inr), // integer column — numeric only
      price_usd: toIntOrNull(form.price_usd), // integer column — numeric only
      features: featuresArray,                // jsonb array
      cta: form.cta,
      popular: form.popular,
      order_index: form.order_index
    };

    if (editId) {
      await supabase.from("pricing_plans").update(payload).eq("id", editId);
    } else {
      await supabase.from("pricing_plans").insert(payload);
    }

    resetForm();
    fetchPlans();
  };

  const startEdit = (plan) => {
    setEditId(plan.id);
    setIsEditing(true);
    setForm({
      name: plan.name || "",
      description: plan.description || "",
      price_inr: plan.price_inr ?? "",
      price_usd: plan.price_usd ?? "",
      // features is jsonb (array). Defensive fallback handles legacy string rows.
      features: Array.isArray(plan.features) ? plan.features.join("\n") : (plan.features || ""),
      cta: plan.cta || "Get Started",
      popular: plan.popular || false,
      order_index: plan.order_index || 0
    });
  };

  const deletePlan = async (id) => {
    if(!confirm("Are you sure you want to delete this plan?")) return;
    await supabase.from("pricing_plans").delete().eq("id", id);
    fetchPlans();
  };

  const resetForm = () => {
    setEditId(null);
    setIsEditing(false);
    setForm({
      name: "",
      description: "",
      price_inr: "",
      price_usd: "",
      features: "",
      cta: "Get Started",
      popular: false,
      order_index: 0
    });
  };

  return (
    <AdminLayout title="Manage Pricing Plans">
      <div className="flex justify-end mb-6">
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Plan
          </Button>
        )}
      </div>

      {isEditing && (
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm mb-10 space-y-4">
          <h2 className="text-lg font-semibold mb-4">{editId ? "Edit Plan" : "Add New Plan"}</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Plan Name</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-shadow" placeholder="e.g. Starter" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Order Index (sorting)</label>
              <input type="number" value={form.order_index} onChange={e => setForm({...form, order_index: parseInt(e.target.value) || 0})} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-shadow" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Description</label>
            <input value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-shadow" placeholder="Short description" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Price (INR) — number only</label>
              <input type="number" min="0" value={form.price_inr} onChange={e => setForm({...form, price_inr: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-shadow" placeholder="e.g. 25000" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Price (USD) — number only</label>
              <input type="number" min="0" value={form.price_usd} onChange={e => setForm({...form, price_usd: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-shadow" placeholder="e.g. 299" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Features (One per line)</label>
            <textarea value={form.features} onChange={e => setForm({...form, features: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-shadow h-32 resize-y" placeholder="Feature 1\nFeature 2..." />
          </div>

          <div className="grid grid-cols-2 gap-4 items-center">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">CTA Text</label>
              <input value={form.cta} onChange={e => setForm({...form, cta: e.target.value})} className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-shadow" placeholder="Get Started" />
            </div>
            <div className="flex items-center gap-2 mt-4 cursor-pointer" onClick={() => setForm({...form, popular: !form.popular})}>
              <div className={`w-5 h-5 rounded border flex items-center justify-center ${form.popular ? 'bg-secondary border-secondary' : 'bg-background border-border'}`}>
                {form.popular && <div className="w-2.5 h-2.5 bg-secondary-foreground rounded-sm" />}
              </div>
              <span className="text-sm">Highlight as "Most Popular"</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave}>{editId ? "Update Plan" : "Create Plan"}</Button>
            <Button variant="outline" onClick={resetForm}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className={`border rounded-xl p-5 bg-card relative ${plan.popular ? 'border-secondary shadow-md' : 'border-border'}`}>
            {plan.popular && <div className="absolute top-0 right-0 bg-secondary text-secondary-foreground text-[10px] uppercase font-bold px-2 py-1 rounded-bl-lg rounded-tr-xl">Popular</div>}
            
            <h3 className="text-lg font-bold">{plan.name}</h3>
            <p className="text-sm text-muted-foreground mb-4 h-10 line-clamp-2">{plan.description}</p>
            
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
              <div>
                <p className="text-xs text-muted-foreground">INR</p>
                <p className="font-semibold">{plan.price_inr != null ? `₹${Number(plan.price_inr).toLocaleString("en-IN")}` : "Custom"}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">USD</p>
                <p className="font-semibold">{plan.price_usd != null ? `$${Number(plan.price_usd).toLocaleString("en-US")}` : "Custom"}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => startEdit(plan)}>
                <Edit2 className="w-3.5 h-3.5 mr-2" /> Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => deletePlan(plan.id)}>
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminPricing;