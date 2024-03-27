import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast, useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"



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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useEffect, useRef, useState } from "react"


export default function Home() {


  const [links, setLinks] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);





  return (
    <div className="bg-background text-foreground h-[100%] p-2 w-[100%]">
      <div className="w-[100%] flex flex-col h-[100%]">
        <div>
          <Sheet className="flex">

            <SheetTrigger asChild>
              <Button variant="secondary" className="mr-2 w-[max-content]">View Links</Button>
            </SheetTrigger>
            <SheetContent className="text-foreground flex flex-col w-4/4 md:w-3/4">
              <SheetHeader>
                <SheetTitle>List of Links</SheetTitle>
                <SheetDescription className="text-muted-foreground">
                  {`You can scroll through all the links (${links?.length || 0})  you've created and edit or view their analytics.`}
                </SheetDescription>
              </SheetHeader>
              <div className="flex-1 overflow-y-scroll no-scrollbar">

                {
                  links.map((_, i) => (
                    <div key={i} className="bg-card p-4 rounded-md mb-4 space-y-4 border border-border">
                      <p className="text-muted-foreground text-sm"> <span className="text-foreground font-semibold text-lg">Link {i + 1}</span>  - Created {2} days ago </p>

                      <div className="flex flex-col space-y-2">
                        <Label>Link URL</Label>
                        <Input
                          className="w-full"
                          value="example.com"
                          readOnly
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Label>Tracking URL</Label>
                        <Input
                          className="w-full"
                          value="example.com/track/1"
                          readOnly
                        />
                      </div>
                      <div className="flex flex-wrap">
                        <Button variant="secondary">Detailed View</Button>
                        <Button variant="destructive">Delete</Button>
                      </div>
                    </div>
                  ))
                }
              </div>

              <SheetFooter className="border-t border-border mt-4 pt-4">
                <SheetDescription className="text-muted-foreground">
                  2021 © Link Management Server
                </SheetDescription>
              </SheetFooter>
            </SheetContent>




          </Sheet>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary"> Add Link </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90%] sm:max-w-[425px] text-foreground">
              <DialogHeader>
                <DialogTitle>Add Link</DialogTitle>
                <DialogDescription>
                  Add url and tracking url to create a new link. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">
                    Url
                  </Label>
                  <Input value="Pedro Duarte" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">
                    Tracking Url
                  </Label>
                  <Input value="@peduarte" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit"
                  onClick={() => {
                    toast({
                      title: "Scheduled: Catch up",
                      description: "Friday, February 10, 2023 at 5:57 PM",
                    })
                  }}
                >Add</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>


        </div>

        <div className="mt-2 text-muted-foreground text-sm">

          <p>
            Kellysecret.com
          </p>
        </div>

        <Tabs defaultValue="edit" className="w-full mt-2 flex flex-col flex-1">
          <TabsList className="w-[fit-content] mb-2">
            <TabsTrigger value="edit">Edit Link</TabsTrigger>
            <TabsTrigger value="analytics">View Analytics</TabsTrigger>
            <TabsTrigger value="map">Map Visualization </TabsTrigger>

          </TabsList>
          <TabsContent value="edit" className="bg-red-400 flex-1">

            <div className="">
              Edit Link
            </div>

          </TabsContent>

          <TabsContent value="analytics" className="bg-blue-400 flex-1">

            <div className="">
              See Analytics Table
            </div>
          </TabsContent>

          <TabsContent value="map" className="bg-green-400 flex-1">
            <div className="">
              Map
            </div>
          </TabsContent>

        </Tabs>



      </div>


      <Toaster />

    </div>
  );
}
