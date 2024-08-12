import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { css } from "@emotion/css";
import { cn, cx } from "@/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cx(
      css`
        position: fixed;
        inset: 0;
        z-index: 50;
        background-color: rgba(0, 0, 0, 0.8);
        &[data-state="open"] {
          animation: fadeIn 0.5s forwards;
        }
        &[data-state="closed"] {
          animation: fadeOut 0.5s forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `,
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cx(
        css`
          max-width: 90vw;
          max-height: 90vh;
          position: fixed;
          left: 50%;
          top: 50%;
          z-index: 50;
          width: 100%;
          transform: translate(-50%, -50%);
          transition-duration: 200ms;
          background: #12233e;
          position: relativel;
        `,
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        className={cx(css`
          all: unset;
          position: absolute;
          right: 0.24rem;
          top: 0.2rem;
          cursor: pointer;
          color: #fff;
        `)}
      >
        <Cross2Icon
          className={css`
            width: 0.2rem;
            height: 0.2rem;
          `}
        />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx(
        css`
          height: 0.56rem;
          width: 100%;
          display: flex;
          align-items: center;
          padding: 0.16rem 0.24rem;
          border-bottom: 1px solid rgba(211, 226, 247, 0.2);
        `,
        className
      )}
      {...props}
    />
  );
}
DialogHeader.displayName = "DialogHeader";

function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    />
  );
}
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cx(
      css`
        font-weight: 500;
        font-size: 0.16rem;
        color: #ffffff;
        line-height: 0.22rem;
      `,
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

interface DialogContentItemProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
}
function DialogContentItem({
  className,
  children,
  header,
  ...props
}: DialogContentItemProps) {
  return (
    <div
      {...props}
      className={cx(
        css`
          padding: 0 0.24rem;
        `,
        className
      )}
    >
      {header && (
        <div
          className={cx(
            css`
              width: 100%;
              height: 0.6rem;
              border-radius: 0px 0px 0px 0px;
              border-bottom: 1px solid rgba(211, 226, 247, 0.2);
              display: flex;
              align-items: center;

              font-weight: 500;
              font-size: 0.16rem;
              color: #ffffff;
              line-height: 0.22rem;
            `,
            className
          )}
        >
          {header}
        </div>
      )}
      <div
        className={css`
          padding: 0.24rem 0;
        `}
      >
        {children}
      </div>
    </div>
  );
}

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogContentItem,
};
