--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.tags DROP CONSTRAINT tags_pkey;
ALTER TABLE ONLY public.sales DROP CONSTRAINT sales_pkey;
ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
ALTER TABLE ONLY public."productsTags" DROP CONSTRAINT "productsTags_pkey";
ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
ALTER TABLE ONLY public."SequelizeMeta" DROP CONSTRAINT "SequelizeMeta_pkey";
ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.tags ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.sales ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."productsTags" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.carts ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.users_id_seq;
DROP TABLE public.users;
DROP SEQUENCE public.tags_id_seq;
DROP TABLE public.tags;
DROP SEQUENCE public.sales_id_seq;
DROP TABLE public.sales;
DROP SEQUENCE public.products_id_seq;
DROP SEQUENCE public."productsTags_id_seq";
DROP TABLE public."productsTags";
DROP TABLE public.products;
DROP SEQUENCE public.carts_id_seq;
DROP TABLE public.carts;
DROP TABLE public."SequelizeMeta";
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: ABHOME
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO "ABHOME";

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: ABHOME
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: ABHOME; Tablespace: 
--

CREATE TABLE "SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE "SequelizeMeta" OWNER TO "ABHOME";

--
-- Name: carts; Type: TABLE; Schema: public; Owner: ABHOME; Tablespace: 
--

CREATE TABLE carts (
    id integer NOT NULL,
    name text,
    price integer,
    "userId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE carts OWNER TO "ABHOME";

--
-- Name: carts_id_seq; Type: SEQUENCE; Schema: public; Owner: ABHOME
--

CREATE SEQUENCE carts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE carts_id_seq OWNER TO "ABHOME";

--
-- Name: carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ABHOME
--

ALTER SEQUENCE carts_id_seq OWNED BY carts.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: ABHOME; Tablespace: 
--

CREATE TABLE products (
    id integer NOT NULL,
    name character varying(255),
    price integer,
    image text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE products OWNER TO "ABHOME";

--
-- Name: productsTags; Type: TABLE; Schema: public; Owner: ABHOME; Tablespace: 
--

CREATE TABLE "productsTags" (
    id integer NOT NULL,
    "productId" integer,
    "tagId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "productsTags" OWNER TO "ABHOME";

--
-- Name: productsTags_id_seq; Type: SEQUENCE; Schema: public; Owner: ABHOME
--

CREATE SEQUENCE "productsTags_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "productsTags_id_seq" OWNER TO "ABHOME";

--
-- Name: productsTags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ABHOME
--

ALTER SEQUENCE "productsTags_id_seq" OWNED BY "productsTags".id;


--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: ABHOME
--

CREATE SEQUENCE products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE products_id_seq OWNER TO "ABHOME";

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ABHOME
--

ALTER SEQUENCE products_id_seq OWNED BY products.id;


--
-- Name: sales; Type: TABLE; Schema: public; Owner: ABHOME; Tablespace: 
--

CREATE TABLE sales (
    id integer NOT NULL,
    email character varying(255),
    price integer,
    "stripeToken" character varying(255),
    "userId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE sales OWNER TO "ABHOME";

--
-- Name: sales_id_seq; Type: SEQUENCE; Schema: public; Owner: ABHOME
--

CREATE SEQUENCE sales_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sales_id_seq OWNER TO "ABHOME";

--
-- Name: sales_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ABHOME
--

ALTER SEQUENCE sales_id_seq OWNED BY sales.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: ABHOME; Tablespace: 
--

CREATE TABLE tags (
    id integer NOT NULL,
    tag text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE tags OWNER TO "ABHOME";

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: ABHOME
--

CREATE SEQUENCE tags_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE tags_id_seq OWNER TO "ABHOME";

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ABHOME
--

ALTER SEQUENCE tags_id_seq OWNED BY tags.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: ABHOME; Tablespace: 
--

CREATE TABLE users (
    id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    name character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE users OWNER TO "ABHOME";

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: ABHOME
--

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE users_id_seq OWNER TO "ABHOME";

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ABHOME
--

ALTER SEQUENCE users_id_seq OWNED BY users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ABHOME
--

ALTER TABLE ONLY carts ALTER COLUMN id SET DEFAULT nextval('carts_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ABHOME
--

ALTER TABLE ONLY products ALTER COLUMN id SET DEFAULT nextval('products_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ABHOME
--

ALTER TABLE ONLY "productsTags" ALTER COLUMN id SET DEFAULT nextval('"productsTags_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ABHOME
--

ALTER TABLE ONLY sales ALTER COLUMN id SET DEFAULT nextval('sales_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ABHOME
--

ALTER TABLE ONLY tags ALTER COLUMN id SET DEFAULT nextval('tags_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: ABHOME
--

ALTER TABLE ONLY users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


--
-- Name: SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: ABHOME; Tablespace: 
--

ALTER TABLE ONLY "SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: carts_pkey; Type: CONSTRAINT; Schema: public; Owner: ABHOME; Tablespace: 
--

ALTER TABLE ONLY carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- Name: productsTags_pkey; Type: CONSTRAINT; Schema: public; Owner: ABHOME; Tablespace: 
--

ALTER TABLE ONLY "productsTags"
    ADD CONSTRAINT "productsTags_pkey" PRIMARY KEY (id);


--
-- Name: products_pkey; Type: CONSTRAINT; Schema: public; Owner: ABHOME; Tablespace: 
--

ALTER TABLE ONLY products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: sales_pkey; Type: CONSTRAINT; Schema: public; Owner: ABHOME; Tablespace: 
--

ALTER TABLE ONLY sales
    ADD CONSTRAINT sales_pkey PRIMARY KEY (id);


--
-- Name: tags_pkey; Type: CONSTRAINT; Schema: public; Owner: ABHOME; Tablespace: 
--

ALTER TABLE ONLY tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: ABHOME; Tablespace: 
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: public; Type: ACL; Schema: -; Owner: ABHOME
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM "ABHOME";
GRANT ALL ON SCHEMA public TO "ABHOME";
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

