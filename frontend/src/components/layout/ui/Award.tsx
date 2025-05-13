import { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";
import { Award, Scroll, Trophy } from "lucide-react";

type AwardType = "certificate" | "cup" | "medal" | "default";

interface AwardsProps {
    label: string;
    sublabel?: string;
    place?: number;
    icon?: React.ComponentType<LucideProps>;
    iconProps?: LucideProps;
    bgcolor?: string;
    awardType?: AwardType;
    className?: string;
}

export const Awards = ({
    label,
    sublabel,
    place,
    icon: Icon,
    iconProps = { size: 60 },
    bgcolor,
    awardType,
    className,
}: AwardsProps) => {
    if (!Icon && awardType) {
        switch (awardType) {
            case "cup":
                Icon = Trophy;
                iconProps.color = '#64C1DE'
                break;
            case "medal":
                Icon = Award;
                break;
            case "certificate":
                Icon = Scroll;
                iconProps.color = '#90CA47'
                break;
            default:
                break;
        }
    }

    const getBgColor = (place?: number, awardType?: AwardType) => {
        if (bgcolor) return bgcolor;
        
        if (awardType === "certificate") {
            return "bg-gradient-to-r from-lime-400 to-lime-100";
        }
        
        if (awardType === "cup") {
            return "bg-gradient-to-r from-cyan-600 to-cyan-300 border";
        }

        switch (place) {
            case 1: return "bg-gradient-to-r from-yellow-400 to-yellow-200";
            case 2: return "bg-gradient-to-r from-gray-300 to-gray-100";
            case 3: return "bg-gradient-to-r from-amber-600 to-amber-400";
            default: return "bg-gray-100";
        }
    };

    return (
        <div
            className={cn(
                "flex flex-col w-[216px] h-[282px] rounded-lg relative overflow-hidden hover:shadow-lg transition-all duration-300 ease-in-outtransform hover:scale-105",
                getBgColor(place, awardType),
                className
            )}
        >
            {Icon && (
                <div className="bg-stone-50 mb-3 p-2 w-1/2 h-1/2 rounded-br-full opacity-70 ">
                    <Icon {...iconProps} />
                </div>
            )}

            <div className="flex flex-col h-full text-stone-700 justify-between">
                <div>
                    {place && (
                        <div className="text-4xl px-4 font-bold mb-4">
                            {place === 1 ? "1" : place === 2 ? "2" : place === 3 ? "3" : ""}
                            <span className="text-2xl"> место</span>
                        </div>
                    )}

                    {awardType && (
                        <div className="text-4xl px-4 font-bold mb-4">
                            {awardType === 'cup' ? 'Кубок' : awardType === 'certificate' ? 'Диплом' : ''}
                        </div>
                    )}

                    <div className="text-xl px-4 font-medium mb-2">
                        {label}
                    </div>
                </div>
            </div>
        </div>
    );
};