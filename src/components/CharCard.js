"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, User } from "lucide-react";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    Alive: { variant: "success", className: "bg-green-600 hover:bg-green-700" },
    Dead: { variant: "destructive", className: "bg-red-600 hover:bg-red-700" },
    unknown: {
      variant: "secondary",
      className: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    },
  };

  const config = statusConfig[status] || statusConfig.unknown;

  return (
    <Badge variant="default" className={`${config.className} font-medium`}>
      {status}
    </Badge>
  );
};

const CharCard = ({ char }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl p-0 pb-2">
        <div className="relative overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-full h-64 object-cover object-center"
            src={char.image}
            alt={`Character portrait of ${char.name}`}
          />
          <div className="absolute top-3 right-3">
            <StatusBadge status={char.status} />
          </div>
        </div>

        <CardHeader className="pb-2 ">
          <motion.h2
            className="font-bold text-xl text-primary"
            whileHover={{ scale: 1.02 }}
          >
            {char.name}
          </motion.h2>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span className="font-medium">Origin</span>
            </div>
            <p className="text-foreground pl-6">{char.origin.name}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="font-medium">Last known location</span>
            </div>
            <p className="text-foreground pl-6">{char.location.name}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CharCard;
