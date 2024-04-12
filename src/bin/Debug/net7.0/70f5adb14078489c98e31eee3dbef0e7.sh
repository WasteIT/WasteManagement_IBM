function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 3627;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 3627 > /dev/null;
done;

for child in $(list_child_processes 3715);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/edwardrostomian/Documents/GitHub/WasteManagement_IBM/src/bin/Debug/net7.0/70f5adb14078489c98e31eee3dbef0e7.sh;
