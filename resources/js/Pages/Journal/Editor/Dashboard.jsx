import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import { usePage } from "@inertiajs/react"
import { FileInput, FolderSync } from "lucide-react"

const Dashboard = () => {
  const { requestCount } = usePage().props

  return (
    <>
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-medium text-sm">Pending Assign Documents</CardTitle>
                <FileInput size={16} />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="font-bold text-2xl">
                {requestCount[0]}
              </CardTitle>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-medium text-sm">Published Documents</CardTitle>
                <FolderSync size={16} />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="font-bold text-2xl">
                {requestCount[1]}
              </CardTitle>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

Dashboard.layout = page => <AuthenticatedLayout children={page} title="Dashboard" />

export default Dashboard