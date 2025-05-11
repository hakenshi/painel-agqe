import { getAllEvents } from "@/actions/events";
import { getAllSponsors } from "@/actions/sponsors";
import { getAllUsers } from "@/actions/user";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Calendar, Users, HandHeart, Handshake } from "lucide-react";

export default async function HomePage() {

  const users = await getAllUsers()
  const events = await getAllEvents()
  const sponsors = await getAllSponsors()

  return (
    <section className="space-y-5 overflow-y-scroll">
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <Calendar className="w-6 h-6 text-primary" />
            <CardTitle>
              Eventos
            </CardTitle>
          </CardHeader>
          <CardContent className="font-medium text-xl">
            {events.length}
          </CardContent>
          <CardFooter>
            <CardDescription>
              XD
            </CardDescription>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <Users className="w-6 h-6 text-primary" />
            <CardTitle>
              Usuários
            </CardTitle>
          </CardHeader>
          <CardContent className="font-medium text-xl">
            {users.length}
          </CardContent>
          <CardFooter>
            <CardDescription>
              XD
            </CardDescription>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <HandHeart className="w-6 h-6 text-primary" />
            <CardTitle>
              Doações
            </CardTitle>
          </CardHeader>
          <CardContent className="font-medium text-xl">
            {/* Substitua pelo valor real de doações se disponível */}
            0
          </CardContent>
          <CardFooter>
            <CardDescription>
              XD
            </CardDescription>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <Handshake className="w-6 h-6 text-primary" />
            <CardTitle>
              Parceiros
            </CardTitle>
          </CardHeader>
          <CardContent className="font-medium text-xl">
            {sponsors.length}
          </CardContent>
          <CardFooter>
            <CardDescription>
              XD
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
      <div className="grid grid-cols-2 h-96 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>
              <div>Gráfico de Doações</div>
              <span className="font-normal text-sm text-zinc-500">Gráfico mostrando o número de doações realizadas neste mês e no ano atual.</span>
            </CardTitle>
          </CardHeader>
          <CardContent>

          </CardContent>
          <CardFooter className="inline-flex justify-end">
            <Button>Ver mais</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <div>Atividade recente</div>
              <span className="font-normal text-sm text-zinc-500">Atividade recente através da plataforma.</span>
              <Tabs>
                <TabsList>
                  <TabsTrigger className={buttonVariants({variant: "default"})} value="doacoes">
                      Doações
                  </TabsTrigger>

                  <TabsTrigger className={buttonVariants({variant: "default"})} value="eventos">
                      Eventos
                  </TabsTrigger>
                  <TabsContent value="doacoes">
                    doacoes
                  </TabsContent>
                  <TabsContent value="eventos">
                    Eventos
                  </TabsContent>
                </TabsList>
              </Tabs>
            </CardTitle>
          </CardHeader>
          <CardContent>
          </CardContent>
          <CardContent>

          </CardContent>
          <CardFooter className="inline-flex justify-end">
            <Button>Ver mais</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
