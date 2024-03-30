import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast, useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



import {
  Sheet,
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
import { MonthInput } from "@/components/MonthInput/MonthInput"
import { MonthPicker } from "@/components/MonthPicker/MonthPicker"
import { addLink, deleteLink, getAnalytics, getLinks, timeDifferenceInText, updateLinkTrackingUrl } from "@/backend/functions"
import { AnalyticsBarChart } from "@/components/Chart/BarChart"
import { COUNTRIES } from "@/components/CountrySelector/countries"
import CountrySelector from "@/components/CountrySelector/CountrySelector"



export default function Home() {


  const [isOpen, setIsOpen] = useState(false);
  // Default this to a country's code to preselect it
  const [country, setCountry] = useState('world');
  
  function currentMonthAndYear() {
    const currentDate = new Date();
    return {
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    };
  }


  const [links, setLinks] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [selectedMonthData, setSelectedMonthData] = useState({
    month: currentMonthAndYear().month,
    year: currentMonthAndYear().year,
  });
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [inputLink, setInputLink] = useState("");
  const [inputTrackingLink, setInputTrackingLink] = useState("");

  const [editInputLink, setEditInputLink] = useState("");
  const [editInputTrackingLink, setEditInputTrackingLink] = useState("");

  const [linksChanged, setLinksChanged] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);
  const [analyticsRefresh, setAnalyticsRefresh] = useState(false);



  useEffect(() => {

    async function fetchLinks() {
      const links = await getLinks();
      setLinks(links);
    }
    fetchLinks();
  }, [linksChanged]);


  useEffect(() => {

    if (selectedLink) {
      async function fetchAnalytics() {
        let data = await getAnalytics(selectedLink.url);
        setAnalytics(data);
        toast({
          title: "Refresing ... ",
          description: `Successfully refreshed analytics Data!`,
        })
      }

      fetchAnalytics();
    }
  }, [analyticsRefresh])



  useEffect(() => {
    if (selectedLink) {

      async function fetchAnalytics() {
        let data = await getAnalytics(selectedLink.url);
        setAnalytics(data);
      }

      fetchAnalytics();

      setEditInputLink(selectedLink.url);
      setEditInputTrackingLink(selectedLink.tracking);
    }
    else {
      setCountry('world');
      setAnalytics([]);
    }
  }, [selectedLink]);

  async function handleDeleteLink(linkUrl) {
    await deleteLink(linkUrl);
    toast({
      title: "Link deleted",
      description: `Link ${linkUrl} deleted successfully`,
    });
    setLinksChanged(!linksChanged);

  }

  async function handleUpdateLink() {
    await updateLinkTrackingUrl(editInputLink, removeHttpOrHttpsAndEndSlash(editInputTrackingLink));
    toast({
      title: "Link updated",
      description: `Link ${editInputLink} updated successfully`,
    });
    setLinksChanged(!linksChanged)
  }




  function removeHttpOrHttpsAndEndSlash(url) {
    return url.replace(/(^\w+:|^)\/\//, "").replace(/\/$/, "");
  }

  async function handleSubmit() {

    if (inputLink && inputTrackingLink) {
      const result = await addLink(removeHttpOrHttpsAndEndSlash(inputLink), removeHttpOrHttpsAndEndSlash(inputTrackingLink));
      if (result) {
        toast({
          title: "Link added",
          description: `Link '${removeHttpOrHttpsAndEndSlash(inputLink)}' added successfully`,
        });
        setLinksChanged(!linksChanged);
        setInputLink("");
        setInputTrackingLink("");
        setIsDialogOpen(false);
      } else {
        toast({
          title: "Link exists",
          description: `Link '${removeHttpOrHttpsAndEndSlash(inputLink)}' already exists`,
          type: "error",
        });
      }
    } else {
      toast({
        title: "Invalid input",
        description: "Please fill in both fields",
        type: "error",
      });
    }


  }






  return (
    <div className="bg-background text-foreground h-[100%] p-2 w-[100%]">
      <div className="w-[100%] flex flex-col h-[100%]">
        <div>
          <Sheet className="flex" open={isSheetOpen} onOpenChange={setIsSheetOpen}>

            <SheetTrigger asChild>
              <Button variant="secondary" className="mr-2 w-[max-content]">Your Links</Button>
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
                  links.map((link, i) => (
                    <div key={i} className="bg-card p-4 rounded-md mb-4 space-y-4 border border-border">
                      <p className="text-muted-foreground text-sm"> <span className="text-foreground font-semibold text-lg">Link {i + 1}</span>  - Created {timeDifferenceInText(link.timestamp)} </p>

                      <div className="flex flex-col space-y-2">
                        <Label>Link URL</Label>
                        <Input
                          className="w-full"
                          value={link.url}
                          readOnly
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Label>Tracking URL</Label>
                        <Input
                          className="w-full"
                          value={link.tracking}
                          readOnly
                        />
                      </div>
                      <div className="flex flex-wrap">
                        <Button variant="secondary" onClick={() => { setSelectedLink(link); setIsSheetOpen(false); }}>Detailed View</Button>
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

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
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
                  <Input value={inputLink} className="col-span-3"
                    onChange={(e) => setInputLink(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">
                    Tracking Url
                  </Label>
                  <Input value={inputTrackingLink} className="col-span-3"
                    onChange={(e) => setInputTrackingLink(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>

                <Button
                  onClick={handleSubmit}
                >Add</Button>

              </DialogFooter>
            </DialogContent>
          </Dialog>


        </div>
        {
          selectedLink &&
          <div className="mt-2 text-muted-foreground text-sm flex items-center">
            <p>
              <span className="text-foreground font-semibold">Selected Link:</span> {selectedLink.url}
            </p>

            <div onClick={() => setAnalyticsRefresh(!analyticsRefresh)} className="ml-2 cursor-pointer text-foreground font-semibold border border-border rounded-[100%] pt-1 pb-1 pl-2 pr-2">
              ⟲
            </div>
            <div onClick={() => setSelectedLink(null)} className="ml-2 cursor-pointer text-foreground font-semibold border border-border rounded-[100%] pt-1 pb-1 pl-2 pr-2">
              X
            </div>
          </div>

        }



        {
          selectedLink &&
          <Tabs defaultValue="analytics" className="w-full mt-2 flex flex-col flex-1">
            <TabsList className="w-[fit-content] md:m-auto mb-2">
              <TabsTrigger value="analytics">View Analytics</TabsTrigger>
              <TabsTrigger value="edit">Edit Link</TabsTrigger>
              {/* <TabsTrigger value="map">Map Visualization </TabsTrigger> */}

            </TabsList>
            <TabsContent value="edit" className="flex-1">
              <div className="flex flex-col space-y-4 h-[90%] md:h-[50%] w-full">
                <Card className="w-[90%] md:w-[60%] border-border m-auto flex flex-col items-center p-4 md:flex-row">
                  <CardHeader>
                    <CardTitle>Edit Link</CardTitle>
                    <CardDescription>
                      <p className="text-muted-foreground">
                        You can edit the tracking url here.
                      </p>
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex flex-col space-y-4 w-full">

                    <div className="flex flex-col space-y-2">
                      <Label>Link URL</Label>
                      <Input
                        className="w-full"
                        value={editInputLink}
                        onChange={(e) => setEditInputLink(e.target.value)}
                        readOnly
                      />

                    </div>

                    <div className="flex flex-col space-y-2 mt-4">

                      <Label>Tracking URL
                        <span className="text-muted-foreground text-xs"> (Edit the tracking url to update)</span>

                      </Label>
                      <Input
                        className="w-full"
                        value={editInputTrackingLink}
                        onChange={(e) => setEditInputTrackingLink(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-wrap mt-4 gap-2">

                      <Button variant="secondary" onClick={async () => { await handleUpdateLink() }}>
                        Update
                      </Button>
                      <Button variant="destructive" onClick={async () => { await handleDeleteLink(selectedLink.url); setSelectedLink(null) }}>Delete Link</Button>

                    </div>
                  </CardContent>


                </Card>
              </div>




            </TabsContent>

            <TabsContent value="analytics" className="flex-1">

              <div className="flex flex-col md:flex-row mb-2">
                <div className="flex flex-col position-relative w-[200px] justify-center">
                  <MonthInput
                    selected={selectedMonthData}
                    setShowMonthPicker={setIsPickerOpen}
                    showMonthPicker={isPickerOpen}
                  />
                  {isPickerOpen ? (
                    <MonthPicker
                      size="small"
                      setIsOpen={setIsPickerOpen}
                      selected={selectedMonthData}
                      onChange={setSelectedMonthData}
                    />
                  ) : null}
                </div>


                {
                  !isPickerOpen &&
                  <CountrySelector
                    id={'countries'}
                    open={isOpen}
                    onToggle={() => setIsOpen(!isOpen)}
                    onChange={val => setCountry(val)}
                    selectedValue={COUNTRIES.find(option => option.value === country)}
                  />
                }
              </div>

              {
                !isPickerOpen &&
                <div className="w-full mt-auto h-[80%] justify-left items-center flex">
                  <AnalyticsBarChart analytics={analytics} selectedMonthYear={selectedMonthData} country={country} />
                </div>
              }

            </TabsContent>

            <TabsContent value="map" className="flex-1">
              <div className="">
                Map
              </div>
            </TabsContent>

          </Tabs>

        }

        {
          !selectedLink &&
          <div className="w-full mt-2 flex flex-col flex-1 items-center justify-center">
            <p className="text-muted-foreground text-lg font-semibold mt-4">
              No link selected!
            </p>
            <img src="/no_link_selected.png" alt="empty" className="w-[200px]" />
            <p className="text-muted-foreground text-lg text-center">
              <span className="text-foreground font-semibold">Note:</span> Click on the detailed view button from the link to see more information about a link.
            </p>
          </div>
        }



      </div>


      <Toaster />

    </div>
  );
}
