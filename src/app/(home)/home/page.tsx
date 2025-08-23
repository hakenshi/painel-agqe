import { getAllEvents } from "@/actions/events";
import { getAllSponsors } from "@/actions/sponsors";
import { getAllUsers } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, HandHeart, Handshake, Users } from "lucide-react";

export default async function HomePage() {

  const users = await getAllUsers()
  const events = await getAllEvents()
  const sponsors = await getAllSponsors()

  return (
    <section className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <Calendar className="w-6 h-6 text-primary" />
            <CardTitle>
              Eventos
            </CardTitle>
          </CardHeader>
          <CardContent className="font-medium text-xl">
            {Array.isArray(events) ? events.length : 0}
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
            {Array.isArray(users) ? users.length : 0}
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
            {sponsors?.length || 0}
          </CardContent>
          <CardFooter>
            <CardDescription>
              XD
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="h-96">
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
        <Card className="h-96">
          <CardHeader>
            <CardTitle>
              <div>Atividade recente</div>
              <span className="font-normal text-sm text-zinc-500">Atividade recente através da plataforma.</span>
              <Tabs>
                <TabsList>
                  <TabsTrigger value="doacoes">
                    Doações
                  </TabsTrigger>

                  <TabsTrigger value="eventos">
                    Eventos
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="doacoes">
                  doacoes
                </TabsContent>
                <TabsContent value="eventos">
                  Eventos
                </TabsContent>
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
      <div className="grid grid-cols-1 h-96 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>
              <div>Pŕoximos Eventos</div>
              <span className="font-normal text-sm text-zinc-500">Eventos marcados para os próximos 30 dias</span>
            </CardTitle>
          </CardHeader>
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
