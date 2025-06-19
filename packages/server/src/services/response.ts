export type ServiceResponse<D> =
	| {
			ok: true;
			error: null;
			data: D;
	  }
	| {
			ok: false;
			error: string;
			data: null;
	  };

export type RouteResponse<D> = Promise<ServiceResponse<D | null>>;

export const success = <D>(data: D): ServiceResponse<D> => ({
	ok: true,
	error: null,
	data,
});

export const failure = (error: string): ServiceResponse<null> => ({
	ok: false,
	error,
	data: null,
});
