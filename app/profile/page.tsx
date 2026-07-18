'use client'

import { motion } from 'framer-motion'
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { getProfile } from "@/app/actions/profile";
import { User, Mail, Zap, Flame } from 'lucide-react'

interface ProfileData {
  display_name?: string
  email?: string
  total_xp?: number
  streak_count?: number
}

async function getProfileData(): Promise<ProfileData> {
  const profile = await getProfile()
  return profile || {}
}

export default async function ProfilePage() {
  const profile = await getProfileData()

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            My Profile
          </h1>

          <p className="mt-3 text-muted-foreground font-medium">
            Your learning profile and achievement summary.
          </p>
        </motion.div>

        <motion.div 
          className="premium-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          whileHover={{ y: -2 }}
        >

          <div className="space-y-6">

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="flex items-center gap-4"
            >
              <div className="p-3 rounded-2xl bg-primary/20">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                  Display Name
                </p>
                <h2 className="text-2xl font-bold mt-1">
                  {profile?.display_name ?? "Not set"}
                </h2>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <div className="p-3 rounded-2xl bg-accent/20">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                  Email
                </p>
                <h2 className="text-lg font-semibold mt-1">
                  {profile?.email ?? "Unknown"}
                </h2>
              </div>
            </motion.div>

            <div className="h-px bg-border/50 my-4" />

            <motion.div 
              className="grid gap-4 md:grid-cols-2"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
              initial="hidden"
              animate="visible"
            >

              <motion.div 
                className="stat-card"
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                      Total XP
                    </p>
                    <h2 className="mt-2 text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {(profile?.total_xp ?? 0).toLocaleString()}
                    </h2>
                  </div>
                  <Zap className="w-8 h-8 text-primary opacity-50" />
                </div>
              </motion.div>

              <motion.div 
                className="stat-card"
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                      Current Streak
                    </p>
                    <h2 className="mt-2 text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                      {(profile?.streak_count ?? 0)} days
                    </h2>
                  </div>
                  <Flame className="w-8 h-8 text-orange-500 opacity-50" />
                </div>
              </motion.div>

            </motion.div>

          </div>

        </motion.div>

      </div>
    </DashboardLayout>
  );
}
