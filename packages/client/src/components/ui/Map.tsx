import { MapContainer, TileLayer } from "react-leaflet";

export type InteractiveMapProps = {
	center: [number, number];
	zoom: number;
	zoomable: boolean;
	markers?: React.ReactNode;
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
	center,
	zoom,
	zoomable,
	markers,
}) => {
	return (
		<MapContainer
			style={{ width: "100%", height: "100%" }}
			center={center}
			zoom={zoom}
			zoomControl={zoomable}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{markers}
		</MapContainer>
	);
};
