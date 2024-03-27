import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useEffect, useRef, useState } from "react"


export default function Home() {


  const [links, setLinks] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);




  return (
    <div className="bg-background text-foreground h-[100%] p-4 w-[100%]">
      <div className="w-[100%]">
        <Sheet className="flex">

          <SheetTrigger asChild>
            <Button variant="secondary">View All Links</Button>
          </SheetTrigger>
          <SheetContent className="text-foreground flex flex-col">
            <SheetHeader>
              <SheetTitle>All Links</SheetTitle>
              <SheetDescription className="text-muted-foreground">
                {`You can scroll through all the links (${links?.length || 0})  you've created and edit or view their analytics.`}
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 p-2 overflow-y-scroll no-scrollbar">

              {
                links.map((_, i) => (
                  <div key={i} className="bg-card p-4 rounded-md mb-4 space-y-2">
                    <p className="text-muted-foreground text-sm"> <span className="text-foreground font-semibold text-lg">Link {i + 1}</span>  - Created {2} days ago </p>

                    <div>
                      <Label>Link URL</Label>
                      <Input
                        className="w-full"
                        value="example.com"
                        readOnly
                      />
                    </div>
                    <div>
                      <Label>Tracking URL</Label>
                      <Input
                        className="w-full"
                        value="example.com/track/1"
                        readOnly
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="secondary">View</Button>
                      <Button variant="destructive">Delete</Button>
                    </div>
                  </div>
                ))
              }
            </div>

            <SheetFooter>
              <SheetDescription className="text-muted-foreground">
                2021 © Link Management Server
              </SheetDescription>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

    </div>
  );
}
